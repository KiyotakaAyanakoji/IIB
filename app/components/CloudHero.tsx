'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Clouds, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

// Exact Palette from your Specification
const SKY_PALETTE = {
  top: '#5FAEFF',
  mid: '#A8DBFF',
  bottom: '#D7F1FF',
  cloudWhite: '#FFFFFF',
  cloudSoft: '#F8F8F6',
  cloudShadow: '#C9D8E8',
  sunHighlight: '#FFF4D2',
};

const noise3D = createNoise3D();

// 1. Offscreen canvas to sample the "IIB" letter positions in 3D space
function generateIIBPoints(pointCount = 160): THREE.Vector3[] {
  if (typeof window === 'undefined') return [];

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  canvas.width = 800;
  canvas.height = 400;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 800, 400);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 220px "Inter", "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('IIB', 400, 200);

  const data = ctx.getImageData(0, 0, 800, 400).data;
  const validPixels: { x: number; y: number }[] = [];

  for (let y = 0; y < 400; y += 4) {
    for (let x = 0; x < 800; x += 4) {
      if (data[(y * 800 + x) * 4] > 200) {
        validPixels.push({ x, y });
      }
    }
  }

  const points: THREE.Vector3[] = [];
  const stride = Math.max(1, Math.floor(validPixels.length / pointCount));

  for (let i = 0; i < validPixels.length && points.length < pointCount; i += stride) {
    const pt = validPixels[i];
    points.push(
      new THREE.Vector3(
        ((pt.x - 400) / 800) * 24,
        -((pt.y - 200) / 400) * 12,
        (Math.random() - 0.5) * 2
      )
    );
  }

  return points;
}

// 2. The Volumetric Cloud Assembly Component
function IIBCloudLogo() {
  const groupRef = useRef<THREE.Group>(null!);
  const [targets, setTargets] = useState<THREE.Vector3[]>([]);

  useEffect(() => {
    setTargets(generateIIBPoints(150));
  }, []);

  const cloudInstances = useMemo(() => {
    return targets.map((target) => ({
      target,
      start: new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 40 - 10
      ),
      current: new THREE.Vector3(),
      seed: Math.random() * 100,
      scale: 0.8 + Math.random() * 0.5,
    }));
  }, [targets]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Formation factor over 3.5 seconds
    const formation = THREE.MathUtils.clamp(time * 0.3, 0, 1);

    cloudInstances.forEach((inst) => {
      // Organic Simplex noise wind drift (no simple sine waves)
      const nx = noise3D(time * 0.1 + inst.seed, inst.seed, 0) * 0.35;
      const ny = noise3D(0, time * 0.12 + inst.seed, inst.seed) * 0.25;

      const destX = THREE.MathUtils.lerp(inst.start.x, inst.target.x, formation) + nx;
      const destY = THREE.MathUtils.lerp(inst.start.y, inst.target.y, formation) + ny;
      const destZ = THREE.MathUtils.lerp(inst.start.z, inst.target.z, formation);

      inst.current.x = THREE.MathUtils.lerp(inst.current.x, destX, 0.05);
      inst.current.y = THREE.MathUtils.lerp(inst.current.y, destY, 0.05);
      inst.current.z = THREE.MathUtils.lerp(inst.current.z, destZ, 0.05);
    });

    // Parallax mouse tilt
    groupRef.current.rotation.y = state.pointer.x * 0.08;
    groupRef.current.rotation.x = -state.pointer.y * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Clouds limit={180} material={THREE.MeshLambertMaterial}>
        {cloudInstances.map((inst, i) => (
          <Cloud
            key={i}
            position={[inst.current.x, inst.current.y, inst.current.z]}
            scale={inst.scale}
            bounds={[1, 1, 1]}
            volume={2.5}
            color={SKY_PALETTE.cloudWhite}
            growth={3}
            opacity={0.88}
            speed={0.1}
          />
        ))}
      </Clouds>
    </group>
  );
}

// 3. Sky Lighting & Background Gradient
function Atmosphere() {
  const { scene } = useThree();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, SKY_PALETTE.top);
      grad.addColorStop(0.5, SKY_PALETTE.mid);
      grad.addColorStop(1, SKY_PALETTE.bottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 256);
      scene.background = new THREE.CanvasTexture(canvas);
    }
  }, [scene]);

  return (
    <>
      <ambientLight intensity={1.3} color={SKY_PALETTE.mid} />
      <directionalLight position={[20, 30, 20]} intensity={2.2} color={SKY_PALETTE.sunHighlight} />
      <directionalLight position={[-20, -10, -10]} intensity={0.7} color={SKY_PALETTE.cloudShadow} />
    </>
  );
}

// Main Page Section
export default function CloudHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }} dpr={[1, 1.5]}>
        <Atmosphere />
        <IIBCloudLogo />
      </Canvas>

      {/* Subtle Tagline Overlay */}
      <div className="absolute inset-x-0 bottom-12 text-center pointer-events-none z-10">
        <h2 className="text-white text-xs md:text-sm tracking-[0.35em] uppercase font-semibold drop-shadow-md mb-1">
          Industry Intelligence Bridge
        </h2>
        <p className="text-blue-100/90 text-[11px] tracking-[0.2em] uppercase font-medium">
          Connect • Intelligence • Opportunity
        </p>
      </div>
    </section>
  );
}
