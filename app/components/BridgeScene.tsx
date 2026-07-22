'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Edges, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function ArchitecturalWireframe() {
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!groupRef.current || !crystalRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1, 
      },
    });

    // Camera fly-through effect: scale up, rotate, and pull forward
    tl.to(groupRef.current.rotation, {
      x: Math.PI / 2,
      y: Math.PI / 4,
      z: Math.PI,
      ease: 'none',
    }, 0)
    .to(groupRef.current.position, {
      z: 6,
      ease: 'none',
    }, 0)
    // Fade in the inner crystal as we scroll down
    .to(crystalRef.current.material as THREE.MeshPhysicalMaterial, {
      opacity: 1,
      transmission: 0.95,
      roughness: 0.05,
      ease: 'power2.inOut',
    }, 0);

  }, []);

  return (
    <group ref={groupRef}>
      {/* Outer Technical Wireframe (The Blueprint) */}
      <mesh>
        <octahedronGeometry args={[3, 1]} />
        <meshBasicMaterial color="#0A192F" transparent opacity={0.8} />
        <Edges scale={1.05} threshold={15} color="#64748B" />
      </mesh>

      {/* Inner Converging Crystal (The IIB Metaphor) */}
      <mesh ref={crystalRef} scale={0.6}>
        <octahedronGeometry args={[3, 0]} />
        <MeshTransmissionMaterial 
          color="#2A86FF"
          transmission={0} 
          opacity={0}
          transparent
          roughness={0}
          ior={2.4}
          thickness={2.5}
          chromaticAberration={0.8}
          anisotropy={1.0}
          distortion={0.2}
          distortionScale={0.3}
        />
        <Edges scale={1} threshold={15} color="#2A86FF" />
      </mesh>
    </group>
  );
}

export default function BridgeScene() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 45 }} 
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]} // Strict mobile performance cap (guarantees 60fps)
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#2A86FF" />
      <ArchitecturalWireframe />
      <Environment preset="city" environmentIntensity={2} />
    </Canvas>
  );
}
