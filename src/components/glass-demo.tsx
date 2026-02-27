"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function GlassShape() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
        <MeshTransmissionMaterial
          transmission={1}
          ior={1.5}
          thickness={0.5}
          roughness={0.15}
          chromaticAberration={0.05}
          backside
          resolution={1024}
        />
      </mesh>
    </Float>
  );
}

export function GlassDemo() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        {/* Luz ambiente natural para refletir no vidro */}
        <Environment preset="city" />
        
        <GlassShape />
        
        {/* Sombra de contato para dar peso à cena */}
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#000000" />
      </Canvas>
    </div>
  );
}
