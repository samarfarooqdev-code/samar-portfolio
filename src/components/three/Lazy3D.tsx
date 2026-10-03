import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

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
  const [ready, setReady] = useState(false);
  const [skipScene, setSkipScene] = useState(false);

  useEffect(() => {
    const shouldSkip = window.matchMedia(
      "(pointer: coarse), (max-width: 767px), (prefers-reduced-motion: reduce)",
    ).matches;
    setSkipScene(shouldSkip);
    if (shouldSkip) return;

    const enable = () => setReady(true);
    const timer = globalThis.setTimeout(enable, 1500);
    return () => globalThis.clearTimeout(timer);
  }, []);

  return (
    <ClientOnly fallback={<GridFallback />}>
      {skipScene || !ready ? <GridFallback /> : <HeroCanvasInner />}
    </ClientOnly>
  );
}

function HeroCanvasInner() {
  const ok = useWebGL();
  const lowMotionDevice = window.matchMedia(
    "(pointer: coarse), (prefers-reduced-motion: reduce)",
  ).matches;
  if (lowMotionDevice) return <GridFallback />;
  if (ok === false) return <GridFallback />;
  return <HeroCanvasViewport ok={ok} />;
}

function HeroCanvasViewport({ ok }: { ok: boolean | null }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry?.isIntersecting ?? false),
      { rootMargin: "160px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="hero-canvas-wrap" aria-hidden="true">
      <Suspense fallback={<GridFallback />}>{ok ? <HeroScene active={active} /> : null}</Suspense>
    </div>
  );
}
