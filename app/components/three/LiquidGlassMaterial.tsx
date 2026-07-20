'use client';

import * as THREE from 'three';

// Re-export the MeshTransmissionMaterial from drei for use in HeroMesh
// Note: In React Three Fiber v9+, we use the material directly as a JSX element
// The extend() approach doesn't work with forwardRef components from drei

// Liquid glass material props type for use with meshTransmissionMaterial
export interface LiquidGlassMaterialProps {
  color?: string;
  roughness?: number;
  transmission?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  distortion?: number;
  distortionScale?: number;
  temporalDistortion?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  metalness?: number;
  ior?: number;
}

// Default liquid glass material configuration
export const liquidGlassDefaults: LiquidGlassMaterialProps = {
  color: '#4DE8D4',
  roughness: 0.15,
  transmission: 1,
  thickness: 0.5,
  chromaticAberration: 0.03,
  anisotropy: 0.3,
  distortion: 0.2,
  distortionScale: 0.3,
  temporalDistortion: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  metalness: 0,
  ior: 1.5,
};

// Physical material fallback configuration
export const liquidGlassPhysicalDefaults: LiquidGlassMaterialProps = {
  color: '#4DE8D4',
  roughness: 0.2,
  metalness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  transmission: 0.9,
  thickness: 0.5,
  ior: 1.5,
};