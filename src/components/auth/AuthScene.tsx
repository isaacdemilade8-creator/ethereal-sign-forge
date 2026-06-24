import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sparkles } from "@react-three/drei";
import type { Mesh } from "three";

function MorphingOrb() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.y = t * 0.2;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={[0, 0, 0]} scale={1.7}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          distort={0.45}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

function AccentTorus() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.z = t * 0.25;
  });
  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={[2.4, -1.4, -0.5]} scale={0.55}>
        <torusKnotGeometry args={[1, 0.32, 160, 24]} />
        <meshStandardMaterial
          color="#d946ef"
          emissive="#a21caf"
          emissiveIntensity={0.5}
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function FloatingCube() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.5;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.4}>
      <mesh ref={ref} position={[-2.6, 1.6, -0.8]} scale={0.4}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export function AuthScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a5f3fc" />
        <pointLight position={[-5, -3, -2]} intensity={1.5} color="#f0abfc" />
        <MorphingOrb />
        <AccentTorus />
        <FloatingCube />
        <Sparkles count={60} scale={8} size={2} speed={0.4} color="#67e8f9" />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
