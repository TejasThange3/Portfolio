"use client";

import { useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Golden material for the Kaalchakra
const GoldenMaterial = ({ emissiveIntensity = 0.2 }: { emissiveIntensity?: number }) => (
  <meshStandardMaterial
    color="#FFD700"
    emissive="#B8860B"
    emissiveIntensity={emissiveIntensity}
    metalness={1}
    roughness={0.2}
    envMapIntensity={1.5}
  />
);

// Inner Torus Knot - The sacred endless cycle
function InnerKnot() {
  const knotRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <mesh ref={knotRef}>
      <torusKnotGeometry args={[1, 0.25, 128, 32]} />
      <GoldenMaterial emissiveIntensity={0.3} />
    </mesh>
  );
}

// Middle decorative ring
function MiddleRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2, 0.05, 16, 100]} />
      <GoldenMaterial emissiveIntensity={0.25} />
    </mesh>
  );
}

// Outer majestic rim with ornaments
function OuterRim() {
  const rimRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (rimRef.current) {
      rimRef.current.rotation.z += delta * 0.05;
    }
  });

  const ornaments = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return (
        <mesh 
          key={i} 
          position={[
            3 * Math.cos(angle), 
            3 * Math.sin(angle), 
            0
          ]}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <GoldenMaterial emissiveIntensity={0.4} />
        </mesh>
      );
    });
  }, []);

  return (
    <group ref={rimRef}>
      <mesh>
        <torusGeometry args={[2.8, 0.12, 16, 100]} />
        <GoldenMaterial emissiveIntensity={0.2} />
      </mesh>
      {ornaments}
    </group>
  );
}

// Secondary decorative rings
function DecorativeRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.y += delta * 0.06;
    if (ring2Ref.current) ring2Ref.current.rotation.x -= delta * 0.04;
  });

  return (
    <>
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.4, 0.03, 16, 80]} />
        <GoldenMaterial emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.03, 16, 80]} />
        <GoldenMaterial emissiveIntensity={0.15} />
      </mesh>
    </>
  );
}

// Main Kaalchakra component
function KaalchakraMandala({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Apply scroll-based transformations
  useFrame(() => {
    if (groupRef.current) {
      // Base rotation tilted for dramatic view
      groupRef.current.rotation.x = Math.PI / 4 + scrollProgress * Math.PI * 0.5;
      groupRef.current.rotation.y = scrollProgress * Math.PI;
      
      // Scale based on scroll
      const scale = 1.5 - scrollProgress * 0.3;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef} scale={[1.5, 1.5, 1.5]} rotation={[Math.PI / 4, 0, 0]}>
        {/* Core Torus Knot - The endless cycle */}
        <InnerKnot />
        
        {/* Middle ring */}
        <MiddleRing />
        
        {/* Decorative rings */}
        <DecorativeRings />
        
        {/* Outer rim with ornaments */}
        <OuterRim />
        
        {/* Point light for golden glow */}
        <pointLight position={[5, 5, 5]} intensity={2} color="#FFD700" />
        <pointLight position={[-5, -5, 5]} intensity={1} color="#B8860B" />
      </group>
    </Float>
  );
}

// Camera controller for scroll-based movement
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    // Move camera based on scroll
    const targetZ = 8 - scrollProgress * 3;
    const targetY = scrollProgress * 2;
    const targetX = Math.sin(scrollProgress * Math.PI) * 2;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Particle field for cosmic background
function CosmicParticles({ isDark }: { isDark: boolean }) {
  const count = 500;
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10 + Math.random() * 20;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial 
        size={0.05} 
        color={isDark ? "#FFD700" : "#B8860B"} 
        transparent 
        opacity={isDark ? 0.6 : 0.3} 
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Loading fallback
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-amber-500 text-sm font-medium">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

// Main Scene Component
interface KaalchakraSceneProps {
  className?: string;
  scrollProgress?: number;
}

export default function KaalchakraScene({ className = "", scrollProgress = 0 }: KaalchakraSceneProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Lighting */}
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.5 : 1} color="#FFFFFF" />
        <spotLight
          position={[0, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={isDark ? 2 : 1.5}
          color="#FFF8DC"
        />

        {/* Camera controller */}
        <CameraController scrollProgress={scrollProgress} />

        {/* Main Kaalchakra */}
        <KaalchakraMandala scrollProgress={scrollProgress} />

        {/* Cosmic particles */}
        <CosmicParticles isDark={isDark} />

        {/* Sparkle effect */}
        <Sparkles 
          count={60}
          scale={12}
          size={1.5}
          speed={0.2}
          color="#FFD700"
          opacity={0.5}
        />
      </Canvas>
    </div>
  );
}
