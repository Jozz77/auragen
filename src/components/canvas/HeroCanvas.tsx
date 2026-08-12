"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// ─── DNA Double-Helix Particle Cloud ────────────────────────────────────────

function DNAHelix({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  const geometry = useMemo(() => {
    const helixCount = 600;
    const rungCount = 44;
    const rungPoints = 8;
    const total = helixCount + rungCount * rungPoints;

    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);

    const colorA = new THREE.Color(isDark ? "#00F2FE" : "#0D9488");
    const colorB = new THREE.Color(isDark ? "#00F5A0" : "#3B82F6");

    // Two interlocked helix strands
    for (let i = 0; i < helixCount; i++) {
      const t = (i / helixCount) * Math.PI * 9;
      const y = (i / helixCount) * 6.4 - 3.2;
      const strandOffset = i % 2 === 0 ? 0 : Math.PI;
      const r = 1.35;

      positions[i * 3 + 0] = Math.cos(t + strandOffset) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(t + strandOffset) * r;

      const c = i % 2 === 0 ? colorA : colorB;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    // Connecting rungs between the two strands
    for (let i = 0; i < rungCount; i++) {
      const t = (i / rungCount) * Math.PI * 9;
      const y = (i / rungCount) * 6.4 - 3.2;
      const r = 1.35;

      const x1 = Math.cos(t) * r;
      const z1 = Math.sin(t) * r;
      const x2 = Math.cos(t + Math.PI) * r;
      const z2 = Math.sin(t + Math.PI) * r;

      for (let j = 0; j < rungPoints; j++) {
        const alpha = j / (rungPoints - 1);
        const idx = (helixCount + i * rungPoints + j) * 3;

        positions[idx + 0] = x1 + (x2 - x1) * alpha;
        positions[idx + 1] = y;
        positions[idx + 2] = z1 + (z2 - z1) * alpha;

        const c = colorA.clone().lerp(colorB, alpha);
        colors[idx + 0] = c.r;
        colors[idx + 1] = c.g;
        colors[idx + 2] = c.b;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [isDark]);

  // Dispose old geometry to prevent memory leaks
  useEffect(() => () => { geometry.dispose(); }, [geometry]);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Continuous ambient rotation
    groupRef.current.rotation.y += 0.004;
    // Subtle mouse-driven parallax tilt
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.22,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      state.pointer.x * 0.12,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          size={isDark ? 0.055 : 0.042}
          vertexColors
          transparent
          opacity={isDark ? 0.95 : 0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ─── Atmospheric Floating Orbs ───────────────────────────────────────────────

function FloatingOrbs({ isDark }: { isDark: boolean }) {
  return (
    <>
      {/* Large translucent background orb */}
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
        <Sphere args={[0.55, 32, 32]} position={[2.3, 0.7, -1.8]}>
          <MeshDistortMaterial
            color={isDark ? "#00F2FE" : "#0D9488"}
            distort={0.28}
            speed={1.4}
            transparent
            opacity={isDark ? 0.1 : 0.09}
            roughness={0}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      {/* Wireframe accent orb */}
      <Float speed={2.1} rotationIntensity={0.9} floatIntensity={0.75}>
        <Sphere args={[0.32, 24, 24]} position={[-2.6, -1.4, 0.4]}>
          <MeshDistortMaterial
            color={isDark ? "#00F5A0" : "#3B82F6"}
            distort={0.55}
            speed={2.6}
            transparent
            opacity={isDark ? 0.2 : 0.13}
            roughness={0}
            metalness={0.8}
            wireframe
          />
        </Sphere>
      </Float>

      {/* Small emissive node A */}
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={1.8}>
        <Sphere args={[0.16, 16, 16]} position={[3.0, -2.1, 0.9]}>
          <meshStandardMaterial
            color={isDark ? "#00F2FE" : "#0D9488"}
            emissive={isDark ? "#00F2FE" : "#0D9488"}
            emissiveIntensity={isDark ? 2.5 : 0.6}
            roughness={0}
            metalness={1}
          />
        </Sphere>
      </Float>

      {/* Small emissive node B */}
      <Float speed={2.6} rotationIntensity={1.1} floatIntensity={2.2}>
        <Sphere args={[0.11, 16, 16]} position={[-1.7, 2.8, -0.9]}>
          <meshStandardMaterial
            color={isDark ? "#00F5A0" : "#2563EB"}
            emissive={isDark ? "#00F5A0" : "#2563EB"}
            emissiveIntensity={isDark ? 2.5 : 0.6}
            roughness={0}
            metalness={1}
          />
        </Sphere>
      </Float>
    </>
  );
}

// ─── Full Scene ──────────────────────────────────────────────────────────────

function SceneContent({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.08 : 0.55} />
      <pointLight
        position={[3, 3, 3]}
        intensity={isDark ? 18 : 6}
        color={isDark ? "#00F2FE" : "#0D9488"}
      />
      <pointLight
        position={[-3, -2, -2]}
        intensity={isDark ? 12 : 4}
        color={isDark ? "#00F5A0" : "#2563EB"}
      />

      <DNAHelix isDark={isDark} />
      <FloatingOrbs isDark={isDark} />

      {isDark && (
        <Stars
          radius={22}
          depth={10}
          count={350}
          factor={1.8}
          fade
          speed={0.4}
        />
      )}
    </>
  );
}

// ─── Canvas Export ───────────────────────────────────────────────────────────

export function HeroCanvas() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Default to dark before hydration to prevent flash
  const isDark = !mounted ? true : resolvedTheme === "dark";

  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
