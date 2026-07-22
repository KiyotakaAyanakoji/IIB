'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Text3D, MeshTransmissionMaterial, Environment, Sky, Clouds, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

function CrystalIIB() {
  const logoRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!logoRef.current) return;

    const time = state.clock.getElapsedTime();

    // R3F pointer is normalized (-1 to 1). 
    // Smooth lerp for snappy but fluid hyper-refractive tracking
    const targetX = (state.pointer.x * Math.PI) / 3.5;
    const targetY = (state.pointer.y * Math.PI) / 3.5;

    logoRef.current.rotation.y = THREE.MathUtils.lerp(logoRef.current.rotation.y, targetX, 0.08);
    logoRef.current.rotation.x = THREE.MathUtils.lerp(logoRef.current.rotation.x, -targetY, 0.08);

    // Weightless anti-gravity sky floating
    logoRef.current.position.y = Math.sin(time * 1.2) * 0.18;
    logoRef.current.position.x = Math.cos(time * 0.8) * 0.08;
  });

  return (
    <>
      <Sky sunPosition={[15, 25, 10]} inclination={0.3} azimuth={180} />
      <color attach="background" args={['#2A86FF']} />

      {/* High intensity city env map guarantees sharp specular glints */}
      <Environment preset="city" environmentIntensity={4.5} />

      {/* Hard directional lighting for prismatic dispersion */}
      <directionalLight position={[20, 30, 15]} intensity={6.0} color="#FFFFFF" />
      <directionalLight position={[-15, -10, -10]} intensity={2.0} color="#A8DBFF" />
      <ambientLight intensity={1.8} />

      <Clouds limit={300} material={THREE.MeshLambertMaterial}>
        <Cloud position={[0, -6, -12]} bounds={[14, 4, 2]} volume={15} color="#FFFFFF" opacity={0.85} />
        <Cloud position={[-12, 4, -16]} bounds={[12, 4, 2]} volume={10} color="#FFFFFF" opacity={0.65} />
        <Cloud position={[12, 6, -14]} bounds={[12, 4, 2]} volume={10} color="#FFFFFF" opacity={0.6} />
      </Clouds>

      {/* Wrapping Center in the animating group prevents bounding box fights */}
      <group ref={logoRef}>
        <Center scale={0.85}>
          <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={2.6}
            height={0.8}
            curveSegments={64}
            bevelEnabled
            bevelThickness={0.25}
            bevelSize={0.15}
            bevelOffset={0}
            bevelSegments={24}
          >
            IIB
            {/* Tuned for Hyper-refractive Crystal: high thickness, extreme aberration, zero roughness */}
            <MeshTransmissionMaterial
              backside
              samples={16}
              thickness={4.5}
              ior={2.0}
              chromaticAberration={0.8}
              anisotropy={1.0}
              distortion={0.2}
              distortionScale={0.3}
              temporalDistortion={0.0}
              clearcoat={1}
              clearcoatRoughness={0.0}
              roughness={0.0}
              transmission={1}
              color="#FFFFFF"
              attenuationColor="#E0F2FE"
              attenuationDistance={1.5}
            />
          </Text3D>
        </Center>
      </group>
    </>
  );
}

export default function LoginScene() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-[#2A86FF] flex items-center justify-center">
        <h1 className="text-8xl font-bold text-white/90 drop-shadow-2xl tracking-tighter">IIB</h1>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      // Forcing pointer events guarantees parallax registers even with absolute overlays
      style={{ pointerEvents: 'auto', touchAction: 'none' }}
    >
      <Suspense fallback={null}>
        <CrystalIIB />
      </Suspense>
    </Canvas>
  );
}
