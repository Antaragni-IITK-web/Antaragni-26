"use client";

import { useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** glow color under cursor */
  glow?: "gold" | "crimson";
}

/**
 * Premium card whose border and interior light follow the cursor.
 * CSS-variable driven — no re-renders on mousemove.
 */
export function SpotlightCard({ children, className, glow = "gold" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  const rgba = glow === "gold" ? "212,162,78" : "217,35,35";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm transition-colors duration-500",
        hovered && "border-white/[0.14]",
        className
      )}
    >
      {/* cursor-following interior light */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(${rgba},0.10), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
