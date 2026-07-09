"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colors } from "@/lib/design-tokens";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HOME_BASE: [number, number] = [41.9, 12.5];
const CLIENT_POINTS: Array<{ name: string; lat: number; lng: number }> = [
  { name: "Home", lat: 41.9, lng: 12.5 },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function NetworkArcs() {
  const arcsRef = useRef<THREE.LineSegments>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const { arcPositions, particlePositions } = useMemo(() => {
    const radius = 2.5;
    const home = latLngToVector3(HOME_BASE[0], HOME_BASE[1], radius);
    const arcPositions: number[] = [];
    const particlePositions: number[] = [];

    CLIENT_POINTS.forEach((point) => {
      const p = latLngToVector3(point.lat, point.lng, radius);
      const mid = new THREE.Vector3().addVectors(home, p).multiplyScalar(0.5);
      const height = 1.0;
      mid.normalize().multiplyScalar(radius + height);

      const segments = 32;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const a = new THREE.Vector3().lerpVectors(home, mid, t);
        const b = new THREE.Vector3().lerpVectors(mid, p, t);
        const pt = new THREE.Vector3().lerpVectors(a, b, t);
        arcPositions.push(pt.x, pt.y, pt.z);
      }

      for (let i = 0; i < 20; i++) {
        particlePositions.push(p.x, p.y, p.z);
      }
    });

    return { arcPositions, particlePositions };
  }, []);

  const arcGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(arcPositions, 3));
    return geo;
  }, [arcPositions]);

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(particlePositions, 3));
    return geo;
  }, [particlePositions]);

  useFrame(() => {
    if (reduced) return;
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const idx = Math.floor(i / 3);
        const arcIdx = Math.floor(idx / 20);
        if (arcIdx < CLIENT_POINTS.length) {
          const p = latLngToVector3(
            CLIENT_POINTS[arcIdx].lat,
            CLIENT_POINTS[arcIdx].lng,
            2.5
          );
          positions[i] = p.x;
          positions[i + 1] = p.y;
          positions[i + 2] = p.z;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (arcsRef.current) {
      arcsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <lineSegments ref={arcsRef} geometry={arcGeometry}>
        <lineBasicMaterial color={colors.signal} opacity={0.3} transparent />
      </lineSegments>
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
color={colors.signal}
          size={0.08}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {CLIENT_POINTS.map((point, i) => {
        const pos = latLngToVector3(point.lat, point.lng, 2.5);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={i === 0 ? colors.signal : colors.ink} />
          </mesh>
        );
      })}
    </group>
  );
}

function NetworkGrid() {
  const gridRef = useRef<THREE.Group>(null);

  const gridPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lng = -180; lng <= 180; lng += 20) {
        points.push(latLngToVector3(lat, lng, 2.5));
      }
    }
    return points;
  }, []);

  return (
    <group ref={gridRef}>
      {gridPoints.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color={colors.ink} opacity={0.15} transparent />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <NetworkGrid />
      <NetworkArcs />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function ClientNetwork() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-signal/10 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
<circle cx="16" cy="16" r="14" stroke={colors.signal} strokeWidth="1" />
              <circle cx="16" cy="16" r="4" fill={colors.signal} />
            </svg>
          </div>
          <p className="text-sm text-ink/40 font-mono">Network visualization</p>
          <p className="text-xs text-ink/60 mt-1">Global client presence (representative)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop="demand"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

