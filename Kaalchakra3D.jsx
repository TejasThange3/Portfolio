import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GoldenMaterial = () => (
  <meshStandardMaterial
    color="#FFD700"      // Pure Gold
    emissive="#B8860B"   // Slight inner glow
    emissiveIntensity={0.2}
    metalness={1}
    roughness={0.2}
    envMapIntensity={1.5}
  />
);

export function Kaalchakra() {
  const outerRingRef = useRef();
  const innerKnotRef = useRef();
  const middleRingRef = useRef();

  // Animation: Rotate rings in opposing directions for a "Time Machine" mechanical feel
  useFrame((state, delta) => {
    if (outerRingRef.current) outerRingRef.current.rotation.z += delta * 0.05;
    if (innerKnotRef.current) innerKnotRef.current.rotation.z -= delta * 0.1;
    if (middleRingRef.current) middleRingRef.current.rotation.x += delta * 0.1; // Slow tumble
  });

  return (
    <group scale={[1.5, 1.5, 1.5]} rotation={[Math.PI / 4, 0, 0]}> 
      {/* 1. The Core Intricate Knot (The Endless Cycle) */}
      {/* Replacing simple spheres with a TorusKnot creates the "Mandala" weave effect */}
      <mesh ref={innerKnotRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <GoldenMaterial />
      </mesh>

      {/* 2. Middle Detail Ring with Decorative "Spokes" */}
      <mesh ref={middleRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <GoldenMaterial />
      </mesh>

      {/* 3. Outer Majestic Rim (The Boundary of Time) */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.8, 0.15, 16, 100]} />
        <GoldenMaterial />
        
        {/* Ornaments on the Outer Ring (Vajra/Spikes) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              3 * Math.cos((i / 8) * Math.PI * 2), 
              3 * Math.sin((i / 8) * Math.PI * 2), 
              0
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <GoldenMaterial />
          </mesh>
        ))}
      </mesh>

      {/* 4. Ambient Light specific to the object to make gold shine */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
    </group>
  );
}