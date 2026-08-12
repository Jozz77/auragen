"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// ─── DNA Double Helix + Junction Nodes ──────────────────────────────────────
// The group contains:
//   1. Fine strand points (BufferGeometry / Points)
//   2. Instanced glowing sphere nodes at every rung junction
//   3. Rung connector point lines

function DNAHelix({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  // ── Strand + rung point cloud ──────────────────────────────────────────────
  const strandGeo = useMemo(() => {
    const strandPts = 800;   // fine particles per strand × 2
    const rungCount = 52;
    const rungPts   = 10;    // interior rung points (excludes endpoints)
    const total = strandPts * 2 + rungCount * rungPts;

    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);

    const cA = new THREE.Color(isDark ? "#00F2FE" : "#0D9488");
    const cB = new THREE.Color(isDark ? "#00F5A0" : "#3B82F6");
    const cM = new THREE.Color(isDark ? "#7FFFEF" : "#14B8A6"); // rung midpoint

    const R = 1.4;   // helix radius
    const H = 7.0;   // total height
    const turns = 4.5; // number of full rotations

    // Strand A
    for (let i = 0; i < strandPts; i++) {
      const t = (i / strandPts) * Math.PI * 2 * turns;
      const y = (i / strandPts) * H - H / 2;
      pos[i * 3 + 0] = Math.cos(t) * R;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(t) * R;
      col[i * 3 + 0] = cA.r; col[i * 3 + 1] = cA.g; col[i * 3 + 2] = cA.b;
    }

    // Strand B (offset π)
    for (let i = 0; i < strandPts; i++) {
      const base = strandPts + i;
      const t = (i / strandPts) * Math.PI * 2 * turns;
      const y = (i / strandPts) * H - H / 2;
      pos[base * 3 + 0] = Math.cos(t + Math.PI) * R;
      pos[base * 3 + 1] = y;
      pos[base * 3 + 2] = Math.sin(t + Math.PI) * R;
      col[base * 3 + 0] = cB.r; col[base * 3 + 1] = cB.g; col[base * 3 + 2] = cB.b;
    }

    // Connecting rungs (interior points between the two endpoints)
    for (let r = 0; r < rungCount; r++) {
      const frac = r / (rungCount - 1);
      const t = frac * Math.PI * 2 * turns;
      const y = frac * H - H / 2;
      const x1 = Math.cos(t) * R,         z1 = Math.sin(t) * R;
      const x2 = Math.cos(t + Math.PI) * R, z2 = Math.sin(t + Math.PI) * R;

      for (let p = 0; p < rungPts; p++) {
        const a = (p + 1) / (rungPts + 1); // skip exact endpoints
        const idx = (strandPts * 2 + r * rungPts + p) * 3;
        pos[idx + 0] = x1 + (x2 - x1) * a;
        pos[idx + 1] = y;
        pos[idx + 2] = z1 + (z2 - z1) * a;
        const mc = cA.clone().lerp(a < 0.5 ? cM : cB, Math.abs(a - 0.5) * 2);
        col[idx + 0] = mc.r; col[idx + 1] = mc.g; col[idx + 2] = mc.b;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    return geo;
  }, [isDark]);

  useEffect(() => () => { strandGeo.dispose(); }, [strandGeo]);

  // ── Junction node positions (endpoints of every rung) ─────────────────────
  const nodePositions = useMemo<[number, number, number][]>(() => {
    const rungCount = 52;
    const R = 1.4, H = 7.0, turns = 4.5;
    const pts: [number, number, number][] = [];
    for (let r = 0; r < rungCount; r++) {
      const frac = r / (rungCount - 1);
      const t = frac * Math.PI * 2 * turns;
      const y = frac * H - H / 2;
      pts.push([Math.cos(t) * R,           y, Math.sin(t) * R]);
      pts.push([Math.cos(t + Math.PI) * R, y, Math.sin(t + Math.PI) * R]);
    }
    return pts;
  }, []);

  // ── Mouse parallax + ambient rotation ─────────────────────────────────────
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0035;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, -state.pointer.y * 0.28, 0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,  state.pointer.x * 0.14, 0.04
    );
  });

  const nodeColor  = isDark ? "#00F2FE" : "#0D9488";
  const nodeColor2 = isDark ? "#00F5A0" : "#3B82F6";

  return (
    <group ref={groupRef}>
      {/* Fine strand + rung point cloud */}
      <points geometry={strandGeo}>
        <pointsMaterial
          size={isDark ? 0.048 : 0.036}
          vertexColors
          transparent
          opacity={isDark ? 0.92 : 0.78}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Glowing junction nodes at rung endpoints */}
      {nodePositions.map((p, i) => (
        <Sphere key={i} args={[0.055, 8, 8]} position={p}>
          <meshStandardMaterial
            color={i % 2 === 0 ? nodeColor : nodeColor2}
            emissive={i % 2 === 0 ? nodeColor : nodeColor2}
            emissiveIntensity={isDark ? 3.0 : 0.7}
            roughness={0}
            metalness={isDark ? 0.8 : 0.5}
          />
        </Sphere>
      ))}
    </group>
  );
}

// ─── Ambient Bio-Dust ────────────────────────────────────────────────────────
// 180 slow-drifting particles that create depth and volumetric atmosphere.

function BioDust({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null!);

  const geo = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cA = new THREE.Color(isDark ? "#00F2FE" : "#0D9488");
    const cB = new THREE.Color(isDark ? "#00F5A0" : "#2563EB");
    for (let i = 0; i < count; i++) {
      // Scatter in a flattened sphere around the scene
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const rr    = 2.5 + Math.random() * 2.5;
      pos[i * 3 + 0] = rr * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (2 * Math.random() - 1) * 3.8;
      pos[i * 3 + 2] = rr * Math.sin(phi) * Math.sin(theta);
      const c = Math.random() > 0.5 ? cA : cB;
      col[i * 3 + 0] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    return g;
  }, [isDark]);

  useEffect(() => () => { geo.dispose(); }, [geo]);

  useFrame((state) => {
    if (!ref.current) return;
    // Slow drift — particles gently rotate on a separate axis from the helix
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.012) * 0.15;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={isDark ? 0.032 : 0.024}
        vertexColors
        transparent
        opacity={isDark ? 0.55 : 0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Atmospheric Floating Orbs ───────────────────────────────────────────────

function FloatingOrbs({ isDark }: { isDark: boolean }) {
  return (
    <>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={1.0}>
        <Sphere args={[0.5, 32, 32]} position={[2.4, 0.6, -1.9]}>
          <MeshDistortMaterial
            color={isDark ? "#00F2FE" : "#0D9488"}
            distort={0.25}
            speed={1.3}
            transparent
            opacity={isDark ? 0.09 : 0.07}
            roughness={0}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      <Float speed={2.0} rotationIntensity={0.85} floatIntensity={0.7}>
        <Sphere args={[0.28, 24, 24]} position={[-2.7, -1.5, 0.3]}>
          <MeshDistortMaterial
            color={isDark ? "#00F5A0" : "#3B82F6"}
            distort={0.5}
            speed={2.5}
            transparent
            opacity={isDark ? 0.18 : 0.11}
            roughness={0}
            metalness={0.8}
            wireframe
          />
        </Sphere>
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1.7}>
        <Sphere args={[0.14, 16, 16]} position={[3.1, -2.2, 0.8]}>
          <meshStandardMaterial
            color={isDark ? "#00F2FE" : "#0D9488"}
            emissive={isDark ? "#00F2FE" : "#0D9488"}
            emissiveIntensity={isDark ? 2.8 : 0.6}
            roughness={0} metalness={1}
          />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={1.0} floatIntensity={2.0}>
        <Sphere args={[0.10, 12, 12]} position={[-1.8, 2.9, -1.0]}>
          <meshStandardMaterial
            color={isDark ? "#00F5A0" : "#2563EB"}
            emissive={isDark ? "#00F5A0" : "#2563EB"}
            emissiveIntensity={isDark ? 2.8 : 0.6}
            roughness={0} metalness={1}
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
      {/* Ambient fill */}
      <ambientLight intensity={isDark ? 0.06 : 0.5} />

      {/* Outer coloured key lights */}
      <pointLight position={[3.5, 3, 3]} intensity={isDark ? 20 : 6}
        color={isDark ? "#00F2FE" : "#0D9488"} />
      <pointLight position={[-3, -2, -2]} intensity={isDark ? 14 : 4}
        color={isDark ? "#00F5A0" : "#2563EB"} />

      {/* Central core light inside the helix */}
      <pointLight position={[0, 0, 0]} intensity={isDark ? 2.5 : 0.8}
        color="#00F2FE" distance={4} decay={2} />

      <DNAHelix     isDark={isDark} />
      <BioDust      isDark={isDark} />
      <FloatingOrbs isDark={isDark} />

      {isDark && (
        <Stars radius={24} depth={10} count={400} factor={1.6} fade speed={0.35} />
      )}
    </>
  );
}

// ─── Canvas Export ───────────────────────────────────────────────────────────

export function HeroCanvas() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = !mounted ? true : resolvedTheme === "dark";

  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 48 }}
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
