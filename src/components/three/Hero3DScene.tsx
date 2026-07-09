"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { colors } from "@/lib/design-tokens";

function SphereCore() {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const outerEdges = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(3.2, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);

  const particlePositions = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.6 + Math.random() * 1.2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.08;

    const nx = (pointer.x * 2 - 1) * 0.15;
    const ny = -(pointer.y * 2 - 1) * 0.15;
    meshRef.current.rotation.x += ny * 0.03;
    meshRef.current.rotation.y += nx * 0.04;

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x += 0.001;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
      innerRef.current.rotation.y = Math.cos(t * 0.3) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <lineSegments geometry={outerEdges}>
        <lineBasicMaterial color={colors.ink} opacity={0.25} transparent />
      </lineSegments>

      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.8, 0]} />
        <meshBasicMaterial color={colors.ink} wireframe opacity={0.1} transparent />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[3.2, 1]} />
        <meshBasicMaterial color={colors.paper} transparent opacity={0.85} />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[3.2, 1]} />
        <meshBasicMaterial color={colors.ink} wireframe opacity={0.15} transparent />
      </mesh>

      <mesh>
        <torusGeometry args={[3.5, 0.015, 16, 64]} />
        <meshBasicMaterial color={colors.signal} opacity={0.5} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.01, 16, 64]} />
        <meshBasicMaterial color={colors.signal} opacity={0.3} transparent />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={colors.ink} size={0.04} transparent opacity={0.5} />
      </points>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={colors.signal} />
      </mesh>
    </group>
  );
}

function AmbientGlow() {
  return (
    <mesh>
      <sphereGeometry args={[4.5, 32, 32]} />
      <meshBasicMaterial
        color={colors.signal}
        transparent
        opacity={0.04}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <AmbientGlow />
      <SphereCore />
    </Canvas>
  );
}
