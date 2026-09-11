import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const INK = "#161616";
const VERMILION = "#F04A24";
const PEACH = "#F7B183";

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  const { gl } = useThree();
  useFrame(() => {});
  // attach once
  const bound = useRef(false);
  if (!bound.current && typeof window !== "undefined") {
    bound.current = true;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    gl.domElement.addEventListener("lostcontext", () => {});
  }
  return pointer;
}

function lineMaterial(color: string, opacity: number) {
  return new THREE.LineBasicMaterial({ color, transparent: true, opacity });
}

/** Perspective wireframe room: floor + walls converging to a vanishing point. */
function WireRoom({ depth = 1 }: { depth?: number }) {
  const geo = useMemo(() => {
    const pts: number[] = [];
    const W = 9;
    const H = 5.5;
    const D = 26;
    const steps = 14;
    // floor + ceiling depth lines
    for (let i = 0; i <= steps; i++) {
      const z = -(i / steps) * D;
      pts.push(-W, -H, z, W, -H, z);
      pts.push(-W, H, z, W, H, z);
      pts.push(-W, -H, z, -W, H, z);
      pts.push(W, -H, z, W, H, z);
    }
    const cols = 8;
    for (let i = 0; i <= cols; i++) {
      const x = -W + (2 * W * i) / cols;
      pts.push(x, -H, 0, x, -H, -D);
      pts.push(x, H, 0, x, H, -D);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);
  const mat = useMemo(() => lineMaterial(INK, 0.16), []);
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, depth, 3, dt);
  });
  return (
    <group ref={ref}>
      <lineSegments geometry={geo} material={mat} />
    </group>
  );
}

/** Parallax depth planes made of thin frames. */
function DepthPlanes({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const planes = useMemo(
    () => [
      { z: -3, s: 2.4, o: 0.28, c: INK },
      { z: -7, s: 4.2, o: 0.2, c: VERMILION },
      { z: -12, s: 6.4, o: 0.14, c: INK },
    ],
    [],
  );
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    group.current?.children.forEach((child, i) => {
      const speed = 0.25 + i * 0.18;
      child.rotation.z = Math.sin(t * speed * 0.4) * 0.06;
      const px = (pointer.current?.x ?? 0) * (0.5 + i * 0.45);
      const py = (pointer.current?.y ?? 0) * (0.35 + i * 0.3);
      child.position.x = THREE.MathUtils.damp(child.position.x, px, 2.5, dt);
      child.position.y = THREE.MathUtils.damp(child.position.y, -py, 2.5, dt);
    });
  });
  return (
    <group ref={group}>
      {planes.map((p, i) => (
        <lineSegments key={i} position={[0, 0, p.z]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(p.s * 1.35, p.s)]} />
          <lineBasicMaterial color={p.c} transparent opacity={p.o} />
        </lineSegments>
      ))}
    </group>
  );
}

/** Soft peach light orb (sprite gradient). */
function Glow() {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(247,177,131,0.95)");
    g.addColorStop(0.45, "rgba(247,177,131,0.42)");
    g.addColorStop(1, "rgba(247,177,131,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = 9 + Math.sin(t * 0.5) * 0.6;
    ref.current.scale.set(s, s, 1);
    ref.current.position.x = Math.sin(t * 0.24) * 0.7;
    ref.current.position.y = -0.6 + Math.cos(t * 0.31) * 0.5;
  });
  if (!texture) return null;
  return (
    <mesh ref={ref} position={[0, -0.6, -8]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} color={PEACH} />
    </mesh>
  );
}

/** Orbit nodes connected with thin lines. */
function OrbitNodes({ count = 7 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        const r = 3.1 + (i % 3) * 0.85;
        return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.42, -4 - (i % 4) * 1.4);
      }),
    [count],
  );
  const linkGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    nodes.forEach((n, i) => {
      pts.push(n, nodes[(i + 1) % nodes.length]!);
    });
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [nodes]);
  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.z += dt * 0.045;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.18;
  });
  return (
    <group ref={group}>
      <lineSegments geometry={linkGeo}>
        <lineBasicMaterial color={INK} transparent opacity={0.18} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[i % 3 === 0 ? 0.09 : 0.055, 12, 12]} />
          <meshBasicMaterial color={i % 2 ? VERMILION : INK} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/** Floating geometric diamonds + thin orbital arcs. */
function Diamonds() {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(
    () => [
      { p: [-4.2, 1.9, -3] as const, s: 0.34, c: VERMILION },
      { p: [4.6, 2.3, -5] as const, s: 0.26, c: INK },
      { p: [3.2, -2.2, -2.2] as const, s: 0.2, c: VERMILION },
      { p: [-5.2, -1.6, -6] as const, s: 0.3, c: INK },
    ],
    [],
  );
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    group.current?.children.forEach((c, i) => {
      c.rotation.x += dt * (0.25 + i * 0.06);
      c.rotation.y += dt * (0.3 + i * 0.05);
      c.position.y += Math.sin(t * (0.6 + i * 0.2)) * dt * 0.35;
    });
  });
  return (
    <group ref={group}>
      {items.map((d, i) => (
        <lineSegments key={i} position={[d.p[0], d.p[1], d.p[2]]}>
          <edgesGeometry args={[new THREE.OctahedronGeometry(d.s)]} />
          <lineBasicMaterial color={d.c} transparent opacity={0.6} />
        </lineSegments>
      ))}
      <mesh rotation={[Math.PI / 2.2, 0, 0.3]} position={[0.4, 0.2, -6]}>
        <torusGeometry args={[4.6, 0.006, 6, 96]} />
        <meshBasicMaterial color={INK} transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 1.9, 0.3, -0.2]} position={[0.4, 0.2, -7]}>
        <torusGeometry args={[6.2, 0.006, 6, 96]} />
        <meshBasicMaterial color={VERMILION} transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

/** Subtle technical signal-dot particle field (no stars/sparkles). */
function SignalField({ count = 90 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = -Math.random() * 20;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.012;
    const pos = ref.current.geometry.attributes['position'] as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i += 7) {
      pos.setY(i, pos.getY(i) + Math.sin(t + i) * dt * 0.12);
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={INK} size={0.045} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/** Cursor-following crosshair light. */
function CursorLight({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  useFrame((_, dt) => {
    if (!ref.current) return;
    const tx = (pointer.current?.x ?? 0) * (viewport.width / 2);
    const ty = -(pointer.current?.y ?? 0) * (viewport.height / 2);
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, tx, 6, dt);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, ty, 6, dt);
    ref.current.rotation.z += dt * 0.4;
  });
  return (
    <group ref={ref} position={[0, 0, 1.5]}>
      <lineSegments>
        <edgesGeometry args={[new THREE.RingGeometry(0.22, 0.23, 24)]} />
        <lineBasicMaterial color={VERMILION} transparent opacity={0.7} />
      </lineSegments>
      <mesh>
        <circleGeometry args={[0.02, 12]} />
        <meshBasicMaterial color={VERMILION} />
      </mesh>
    </group>
  );
}

function Rig({
  pointer,
  reduced,
  mobile,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
  reduced: boolean;
  mobile: boolean;
}) {
  const { camera } = useThree();
  const scroll = useRef(0);
  useFrame((state, dt) => {
    scroll.current =
      typeof window === "undefined"
        ? 0
        : Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    const t = state.clock.elapsedTime;
    const drift = reduced ? 0 : 1;
    const px = mobile || reduced ? 0 : (pointer.current?.x ?? 0);
    const py = mobile || reduced ? 0 : (pointer.current?.y ?? 0);
    const tx = Math.sin(t * 0.15) * 0.45 * drift + px * 0.9;
    const ty = Math.cos(t * 0.12) * 0.3 * drift - py * 0.6;
    // scroll pushes the camera back out of the room
    const tz = 8 + scroll.current * 9;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 2, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tz, 3, dt);
    camera.lookAt(0, 0, -6);
  });
  return null;
}

function SceneContents({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const pointer = usePointer();
  return (
    <>
      <Rig pointer={pointer} reduced={reduced} mobile={mobile} />
      <Glow />
      <WireRoom />
      <DepthPlanes pointer={pointer} />
      <OrbitNodes count={mobile ? 5 : 7} />
      <Diamonds />
      <SignalField count={mobile ? 40 : 90} />
      {!mobile && !reduced && <CursorLight pointer={pointer} />}
    </>
  );
}

export default function HeroScene() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, mobile ? 1.3 : 1.8]}
      gl={{ antialias: !mobile, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <SceneContents reduced={reduced} mobile={mobile} />
    </Canvas>
  );
}
