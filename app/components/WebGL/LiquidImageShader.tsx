'use client'

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float u_time;
  uniform float u_scrollVelocity;
  uniform vec2 u_mouse;
  uniform float u_hoverStrength;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float skew = u_scrollVelocity * 0.0015;
    pos.y += skew * (uv.x - 0.5) * 2.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_hoverStrength;
  uniform vec2 u_resolution;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    vec2 mouseUv = u_mouse;
    float dist = distance(uv, mouseUv);

    float radius = 0.35;
    float falloff = smoothstep(radius, 0.0, dist);

    vec2 dir = normalize(uv - mouseUv + 0.0001);
    float ripple = sin(dist * 28.0 - u_time * 3.0) * 0.5 + 0.5;

    float strength = falloff * u_hoverStrength * 0.045;
    vec2 displacedUv = uv + dir * strength * ripple;

    vec4 color = texture2D(u_texture, displacedUv);

    float aberration = falloff * u_hoverStrength * 0.006;
    float r = texture2D(u_texture, displacedUv + vec2(aberration, 0.0)).r;
    float b = texture2D(u_texture, displacedUv - vec2(aberration, 0.0)).b;
    color.r = r;
    color.b = b;

    gl_FragColor = color;
  }
`;

interface LiquidImageShaderProps {
  imageUrl: string;
  width: number;
  height: number;
  scrollVelocity: number;
}

export function LiquidImageShader({
  imageUrl,
  width,
  height,
  scrollVelocity,
}: LiquidImageShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(imageUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [imageUrl]);

  const uniforms = useMemo(
    () => ({
      u_texture: { value: texture },
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_hoverStrength: { value: 0 },
      u_scrollVelocity: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [texture, size]
  );

  const targetHover = useRef(0);

  useFrame((state) => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    u.u_time.value = state.clock.elapsedTime;
    u.u_scrollVelocity.value = THREE.MathUtils.lerp(
      u.u_scrollVelocity.value,
      scrollVelocity,
      0.08
    );
    u.u_hoverStrength.value = THREE.MathUtils.lerp(
      u.u_hoverStrength.value,
      targetHover.current,
      0.08
    );
  });

  function handlePointerMove(e: any) {
    if (!materialRef.current) return;
    materialRef.current.uniforms.u_mouse.value.set(e.uv.x, e.uv.y);
  }

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => (targetHover.current = 1)}
      onPointerLeave={() => (targetHover.current = 0)}
    >
      <planeGeometry args={[width, height, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
