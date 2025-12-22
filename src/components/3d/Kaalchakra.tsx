"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, MeshTransmissionMaterial, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Glowing ring with emission effect
function GlowingRing({ 
  radius, 
  tube = 0.008, 
  color, 
  rotationSpeed = 0, 
  emissiveIntensity = 0.5,
  segments = 64 
}: {
  radius: number;
  tube?: number;
  color: string;
  rotationSpeed?: number;
  emissiveIntensity?: number;
  segments?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current && rotationSpeed !== 0) {
      meshRef.current.rotation.z += rotationSpeed * delta;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tube, 16, segments]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.9} 
        roughness={0.1}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

// Ornate petal shape for the lotus
function LotusPetal({ 
  position, 
  rotation, 
  scale = 1,
  color = "#FFD700"
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.02, 0.03, 0.015, 0.08, 0, 0.1);
    s.bezierCurveTo(-0.015, 0.08, -0.02, 0.03, 0, 0);
    return s;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.005,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.002,
      bevelSegments: 2,
    });
  }, [shape]);

  return (
    <mesh position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <meshStandardMaterial 
        color={color}
        metalness={0.85}
        roughness={0.15}
        emissive={color}
        emissiveIntensity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Lotus flower layer
function LotusLayer({ 
  petalCount, 
  radius, 
  scale = 1, 
  zOffset = 0, 
  angleOffset = 0,
  color = "#FFD700"
}: {
  petalCount: number;
  radius: number;
  scale?: number;
  zOffset?: number;
  angleOffset?: number;
  color?: string;
}) {
  const petals = useMemo(() => {
    return Array.from({ length: petalCount }).map((_, i) => {
      const angle = (i / petalCount) * Math.PI * 2 + angleOffset;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return (
        <LotusPetal
          key={i}
          position={[x, y, zOffset]}
          rotation={[0, 0, angle - Math.PI / 2]}
          scale={scale}
          color={color}
        />
      );
    });
  }, [petalCount, radius, scale, zOffset, angleOffset, color]);

  return <>{petals}</>;
}

// Sacred symbol - Vajra/Dorje inspired
function SacredSymbol({ 
  position, 
  scale = 1,
  rotation = 0
}: {
  position: [number, number, number];
  scale?: number;
  rotation?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime + rotation) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Central orb */}
      <mesh>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={1} 
          roughness={0}
          emissive="#FFD700"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Diamond shape */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.02, 0]} />
        <meshStandardMaterial 
          color="#B8860B" 
          metalness={0.95} 
          roughness={0.05}
          emissive="#FFD700"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// Central dharma wheel (Dharmachakra)
function DharmaWheel() {
  const groupRef = useRef<THREE.Group>(null);
  const spokeCount = 8;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const spokes = useMemo(() => {
    return Array.from({ length: spokeCount }).map((_, i) => {
      const angle = (i / spokeCount) * Math.PI * 2;
      return (
        <mesh key={i} rotation={[0, 0, angle]}>
          <boxGeometry args={[0.12, 0.008, 0.008]} />
          <meshStandardMaterial 
            color="#FFD700" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#FFD700"
            emissiveIntensity={0.4}
          />
        </mesh>
      );
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* Hub */}
      <mesh>
        <torusGeometry args={[0.03, 0.008, 8, 24]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Spokes */}
      {spokes}
      {/* Outer rim */}
      <mesh>
        <torusGeometry args={[0.06, 0.006, 8, 32]} />
        <meshStandardMaterial 
          color="#B8860B" 
          metalness={0.85} 
          roughness={0.15}
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// Ornate gate structure
function OrnateGate({ angle, radius }: { angle: number; radius: number }) {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <group position={[x, y, 0]} rotation={[0, 0, angle]}>
      {/* Gate pillars */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.015, 0.08, 0.01]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[0.015, 0.08, 0.01]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Gate arch */}
      <mesh position={[0.02, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.04, 0.005, 8, 16, Math.PI]} />
        <meshStandardMaterial 
          color="#B8860B" 
          metalness={0.85} 
          roughness={0.15}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

// Main Kaalchakra Mandala with all elements
function KaalchakraMandala() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + 1;
      groupRef.current.scale.setScalar(breathe);
      // Gentle tilt
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Outer protection circle rings */}
        <GlowingRing radius={1.1} color="#8B4513" rotationSpeed={0.2} emissiveIntensity={0.2} />
        <GlowingRing radius={1.05} color="#FFD700" rotationSpeed={-0.15} emissiveIntensity={0.4} />
        <GlowingRing radius={1.0} color="#DAA520" rotationSpeed={0.1} emissiveIntensity={0.3} />
        
        {/* Fire ring layer */}
        <GlowingRing radius={0.9} tube={0.012} color="#FF6B00" rotationSpeed={0.3} emissiveIntensity={0.6} />
        <GlowingRing radius={0.85} color="#FFD700" rotationSpeed={-0.2} emissiveIntensity={0.4} />
        
        {/* Vajra fence / Diamond layer */}
        <GlowingRing radius={0.75} tube={0.01} color="#FFFFFF" rotationSpeed={0.25} emissiveIntensity={0.5} />
        <GlowingRing radius={0.7} color="#B8860B" rotationSpeed={-0.18} emissiveIntensity={0.3} />
        
        {/* Lotus layers */}
        <LotusLayer petalCount={32} radius={0.78} scale={0.8} zOffset={0.01} color="#FFD700" />
        <LotusLayer petalCount={24} radius={0.65} scale={0.7} zOffset={0.02} angleOffset={Math.PI / 24} color="#DAA520" />
        <LotusLayer petalCount={16} radius={0.52} scale={0.6} zOffset={0.03} color="#B8860B" />
        
        {/* Inner mandala rings */}
        <GlowingRing radius={0.55} color="#FFD700" rotationSpeed={0.12} emissiveIntensity={0.5} />
        <GlowingRing radius={0.45} color="#DAA520" rotationSpeed={-0.15} emissiveIntensity={0.4} />
        <GlowingRing radius={0.35} color="#FFD700" rotationSpeed={0.2} emissiveIntensity={0.5} />
        
        {/* Sacred palace walls */}
        <GlowingRing radius={0.25} tube={0.012} color="#8B0000" rotationSpeed={-0.1} emissiveIntensity={0.4} />
        <GlowingRing radius={0.2} tube={0.01} color="#FFD700" rotationSpeed={0.15} emissiveIntensity={0.6} />
        
        {/* Cardinal gates */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <OrnateGate key={i} angle={angle} radius={0.6} />
        ))}
        
        {/* Sacred symbols at 8 directions */}
        {Array.from({ length: 8 }).map((_, i) => (
          <SacredSymbol 
            key={i} 
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 0.4,
              Math.sin((i / 8) * Math.PI * 2) * 0.4,
              0.02
            ]}
            scale={0.8}
            rotation={i}
          />
        ))}
        
        {/* Central Dharma Wheel */}
        <group position={[0, 0, 0.03]}>
          <DharmaWheel />
        </group>
        
        {/* Central deity circle */}
        <mesh position={[0, 0, 0.05]}>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            metalness={0.5}
            roughness={0.5}
            emissive="#4a0080"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Glowing center orb */}
        <mesh position={[0, 0, 0.07]}>
          <sphereGeometry args={[0.03, 32, 32]} />
          <meshStandardMaterial 
            color="#FFD700"
            metalness={1}
            roughness={0}
            emissive="#FFD700"
            emissiveIntensity={1}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Enhanced particle system
function CosmicParticles() {
  const count = 800;
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 4;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Golden/amber colors
      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.84; col[i * 3 + 2] = 0; // Gold
      } else if (colorChoice < 0.8) {
        col[i * 3] = 0.85; col[i * 3 + 1] = 0.65; col[i * 3 + 2] = 0.13; // DarkGoldenrod
      } else {
        col[i * 3] = 1; col[i * 3 + 1] = 1; col[i * 3 + 2] = 1; // White
      }
      
      siz[i] = Math.random() * 0.02 + 0.005;
    }
    
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial 
        size={0.02} 
        vertexColors 
        transparent 
        opacity={0.6} 
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Lighting rig
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#FFD700" />
      <pointLight position={[-3, -3, 3]} intensity={0.8} color="#FF6B00" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#FFFFFF" />
      <spotLight
        position={[0, 5, 5]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        color="#FFF8DC"
        castShadow
      />
    </>
  );
}

// Main component export
export default function Kaalchakra3D({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Lighting />
          
          {/* Main mandala */}
          <KaalchakraMandala />
          
          {/* Cosmic particles */}
          <CosmicParticles />
          
          {/* Sparkle effect */}
          <Sparkles 
            count={100}
            scale={4}
            size={2}
            speed={0.3}
            color="#FFD700"
          />
          
          {/* Interactive controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={6}
            autoRotate
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
