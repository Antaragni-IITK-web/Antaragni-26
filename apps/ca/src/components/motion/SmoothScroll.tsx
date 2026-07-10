"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useStore } from "@repo/store";

/**
 * Buttery inertial scrolling via Lenis. Renders nothing and never blocks
 * SSR content. The instance is shared through the store so nav anchors can
 * use lenis.scrollTo. Disabled under prefers-reduced-motion.
 */
export function SmoothScroll() {
  const setLenis = useStore((s) => s.setLenis);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(undefined);
    };
  }, [setLenis]);

  return null;
}
