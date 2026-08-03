"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/** Wrapper that pulls its child toward the cursor with spring physics. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.4 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [strength, x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  /** solid = filled crimson primary; outline = ghost with gold hover */
  variant?: "solid" | "outline";
}

/**
 * The site's CTA: magnetic pull, sweeping border light, ember glow.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.35,
  variant = "outline",
}: MagneticButtonProps) {
  const inner = (
    <span
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden px-10 py-4 transition-all duration-500 lg:px-14 lg:py-5",
        variant === "outline" &&
          "border border-gold/30 bg-black/30 backdrop-blur-sm hover:border-gold/80 hover:bg-gold/[0.06]",
        variant === "solid" &&
          "bg-accent hover:bg-[#e83030] shadow-[0_0_30px_rgba(217,35,35,0.25)] hover:shadow-[0_0_46px_rgba(217,35,35,0.45)]",
        className
      )}
    >
      {/* border light sweep */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-bright to-transparent" />
        <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold-bright to-transparent" />
      </span>
      {/* under glow */}
      {variant === "outline" && (
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212,162,78,0.16), transparent)",
          }}
        />
      )}
      <span className="relative z-10 font-serif text-[10px] font-semibold uppercase tracking-[0.35em] text-foreground transition-all duration-400 group-hover:tracking-[0.42em] md:text-[11px] lg:text-xs">
        {children}
      </span>
    </span>
  );

  return (
    <Magnetic strength={strength}>
      {href ? (
        <Link href={href} onClick={onClick} className="inline-block">
          {inner}
        </Link>
      ) : (
        <button onClick={onClick} className="inline-block bg-transparent p-0">
          {inner}
        </button>
      )}
    </Magnetic>
  );
}
