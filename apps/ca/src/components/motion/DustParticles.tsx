"use client";

import { useEffect, useRef } from "react";

interface DustParticlesProps {
  /** particle count per 10,000 px² — keep tiny */
  density?: number;
  className?: string;
  /** warm gold motes, neutral white, or mixed fire embers */
  tone?: "gold" | "neutral" | "fire";
}

/**
 * Floating dust motes on canvas — stage dust caught in light.
 * Pauses when offscreen; honors prefers-reduced-motion; cleans up fully.
 */
export function DustParticles({ density = 0.16, className, tone = "gold" }: DustParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;

    // fire embers mix three warm hues; other tones are uniform
    const FIRE_RGBS = ["236,200,121", "255,107,53", "217,80,48"];

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number; rgb: string };
    let particles: P[] = [];

    const seed = () => {
      const count = Math.min(90, Math.round((w * h * density) / 10000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * (tone === "fire" ? 1.4 : 1.7),
        vx: (Math.random() - 0.5) * 0.16,
        vy: -(0.04 + Math.random() * (tone === "fire" ? 0.22 : 0.14)),
        a: 0.04 + Math.random() * 0.22,
        tw: Math.random() * Math.PI * 2,
        rgb:
          tone === "fire"
            ? FIRE_RGBS[Math.floor(Math.random() * FIRE_RGBS.length)]!
            : tone === "gold"
              ? "236,200,121"
              : "244,239,230",
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const frame = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const twinkle = 0.65 + 0.35 * Math.sin(t / 900 + p.tw);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb},${(p.a * twinkle).toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      const visible = Boolean(entry?.isIntersecting);
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!visible) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });

    resize();
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [density, tone]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
