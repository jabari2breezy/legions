'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  varying vec2 vUv;

  float sdSphere(vec3 p, float r) {
    return length(p) - r;
  }

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float map(vec3 p) {
    vec3 p1 = p - vec3(
      sin(u_time * 0.35) * 0.9,
      cos(u_time * 0.28) * 0.6,
      sin(u_time * 0.4) * 0.5
    );
    vec3 p2 = p - vec3(
      cos(u_time * 0.22) * 1.1,
      sin(u_time * 0.31) * 0.7,
      cos(u_time * 0.18) * 0.4
    );
    vec3 p3 = p - vec3(
      sin(u_time * 0.4 + 2.0) * 0.7,
      sin(u_time * 0.25 + 1.0) * 0.9,
      sin(u_time * 0.3) * 0.6
    );
    vec3 p4 = p - vec3(
      u_mouse.x * 1.2,
      u_mouse.y * 0.8,
      0.0
    );

    float d1 = sdSphere(p1, 0.75);
    float d2 = sdSphere(p2, 0.6);
    float d3 = sdSphere(p3, 0.5);
    float d4 = sdSphere(p4, 0.35);

    float d = smin(d1, d2, 0.5);
    d = smin(d, d3, 0.45);
    d = smin(d, d4, 0.6);
    return d;
  }

  vec3 getNormal(vec3 p) {
    float eps = 0.001;
    vec2 e = vec2(1.0, -1.0) * 0.5773 * eps;
    return normalize(
      e.xyy * map(p + e.xyy) +
      e.yyx * map(p + e.yyx) +
      e.yxy * map(p + e.yxy) +
      e.xxx * map(p + e.xxx)
    );
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    vec3 ro = vec3(0.0, 0.0, 3.0);
    vec3 rd = normalize(vec3(uv, -1.5));

    float t = 0.0;
    float d;
    vec3 p;
    bool hit = false;

    for (int i = 0; i < 80; i++) {
      p = ro + rd * t;
      d = map(p);
      if (d < 0.001) { hit = true; break; }
      t += d * 0.8;
      if (t > 8.0) break;
    }

    vec3 bgTop = vec3(0.15, 0.10, 0.55);
    vec3 bgBottom = vec3(0.05, 0.65, 0.6);
    float grad = smoothstep(-0.6, 0.8, uv.y);
    vec3 bg = mix(bgBottom, bgTop, grad);

    float glow = 1.0 - smoothstep(0.0, 1.1, length(uv));
    bg += vec3(0.15, 0.55, 0.5) * glow * 0.5;

    vec3 color = bg;

    if (hit) {
      vec3 n = getNormal(p);
      vec3 viewDir = normalize(ro - p);

      float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);

      vec3 envSample = mix(bgBottom, bgTop, smoothstep(-1.0, 1.0, n.y));

      vec3 lightDir = normalize(vec3(0.6, 0.8, 0.9));
      float spec = pow(max(dot(reflect(-lightDir, n), viewDir), 0.0), 48.0);

      vec3 glassColor = mix(envSample * 0.9, vec3(1.0), fresnel * 0.85);
      glassColor += vec3(1.0) * spec * 1.4;

      float thickness = clamp((t - 1.5) / 3.0, 0.0, 1.0);
      color = mix(glassColor, bg, thickness * 0.25);
    }

    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.035;

    gl_FragColor = vec4(color, 1.0);
  }
`

function BlobPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { size, viewport } = useThree()
  const mouseTarget = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    }),
    [size]
  )

  useFrame((state) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.u_time.value = state.clock.elapsedTime

    const nx = (state.mouse.x * viewport.width) / 4
    const ny = (state.mouse.y * viewport.height) / 4
    mouseTarget.current.lerp(new THREE.Vector2(nx, ny), 0.04)
    materialRef.current.uniforms.u_mouse.value.copy(mouseTarget.current)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export function GlassBlobBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <BlobPlane />
      </Canvas>
    </div>
  )
}
