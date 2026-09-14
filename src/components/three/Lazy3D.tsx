import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => setOk(hasWebGL()), []);
  return ok;
}

/** Static CSS perspective-grid fallback when WebGL is unavailable. */
export function GridFallback() {
  return (
    <div className="grid-fallback" aria-hidden="true">
      <span className="gf-floor" />
      <span className="gf-glow" />
      <span className="gf-node n1" />
      <span className="gf-node n2" />
      <span className="gf-node n3" />
    </div>
  );
}

export function HeroCanvas() {
  return (
    <ClientOnly fallback={<GridFallback />}>
      <HeroCanvasInner />
    </ClientOnly>
  );
}

function HeroCanvasInner() {
  const ok = useWebGL();
  if (ok === false) return <GridFallback />;
  return (
    <div className="hero-canvas-wrap" aria-hidden="true">
      <Suspense fallback={<GridFallback />}>{ok ? <HeroScene /> : null}</Suspense>
    </div>
  );
}
