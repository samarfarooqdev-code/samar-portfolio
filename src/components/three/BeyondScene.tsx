import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const VERMILION = "#F04A24";
const PAPER = "#F6F5F2";

function Faceted({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.25;
    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      (pointer.current?.y ?? 0) * 0.35 + Math.sin(state.clock.elapsedTime * 0.4) * 0.1,
      3,
      dt,
    );
    ref.current.position.x = THREE.MathUtils.damp(
      ref.current.position.x,
      (pointer.current?.x ?? 0) * 0.6,
      3,
      dt,
    );
  });
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.35, 1), []);
  return (
    <group ref={ref}>
      <lineSegments>
        <edgesGeometry args={[geo]} />
        <lineBasicMaterial color={PAPER} transparent opacity={0.85} />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshBasicMaterial color={VERMILION} transparent opacity={0.12} />
      </mesh>
      <lineSegments scale={1.9} rotation={[0.4, 0.2, 0]}>
        <edgesGeometry args={[new THREE.OctahedronGeometry(1.1)]} />
        <lineBasicMaterial color={VERMILION} transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
}

function Planes({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    group.current?.children.forEach((c, i) => {
      c.position.x = THREE.MathUtils.damp(
        c.position.x,
        (pointer.current?.x ?? 0) * (0.4 + i * 0.5),
        2.5,
        dt,
      );
      c.rotation.z += dt * 0.03 * (i + 1);
    });
  });
  return (
    <group ref={group}>
      {[-2.5, -5, -8].map((z, i) => (
        <lineSegments key={z} position={[0, 0, z]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(4 + i * 2.4, 2.6 + i * 1.6)]} />
          <lineBasicMaterial color={PAPER} transparent opacity={0.3 - i * 0.07} />
        </lineSegments>
      ))}
    </group>
  );
}

function Rig({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      (pointer.current?.x ?? 0) * 1.1 + Math.sin(t * 0.2) * 0.2,
      2,
      dt,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      -(pointer.current?.y ?? 0) * 0.8 + Math.cos(t * 0.17) * 0.15,
      2,
      dt,
    );
    camera.lookAt(0, 0, -2);
  });
  return null;
}

export default function BeyondScene({
  pointerRef,
}: {
  pointerRef: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <Rig pointer={pointerRef} />
      <Faceted pointer={pointerRef} />
      <Planes pointer={pointerRef} />
    </Canvas>
  );
}
