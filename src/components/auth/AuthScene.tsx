import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group, Mesh } from "three";

function InkSculpture() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.18;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15;
  });
  return (
    <group ref={group}>
      {/* Wireframe icosahedron — ink lines */}
      <mesh scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#0d0d0d" wireframe wireframeLinewidth={1} />
      </mesh>
      {/* Inner solid paper-toned core */}
      <mesh scale={1.05}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#f5f3ee" />
      </mesh>
    </group>
  );
}

function OrbitingRing() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.z = t * 0.25;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={[0, 0, 0]} scale={2.4}>
        <torusGeometry args={[1, 0.012, 6, 120]} />
        <meshBasicMaterial color="#0d0d0d" />
      </mesh>
    </Float>
  );
}

function OrbitingDot() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const r = 2.4;
    ref.current.position.x = Math.cos(t * 0.5) * r;
    ref.current.position.z = Math.sin(t * 0.5) * r;
    ref.current.position.y = Math.sin(t * 0.7) * 0.4;
  });
  return (
    <mesh ref={ref} scale={0.08}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#c44a2a" />
    </mesh>
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
        <InkSculpture />
        <OrbitingRing />
        <OrbitingDot />
      </Suspense>
    </Canvas>
  );
}
