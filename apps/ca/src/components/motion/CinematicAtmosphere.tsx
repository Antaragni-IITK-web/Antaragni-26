"use client";

import { DustParticles } from "./DustParticles";
import { cn } from "@/lib/utils";

interface CinematicAtmosphereProps {
  className?: string;
  /** drifting smoke layers */
  smoke?: boolean;
  /** floating dust motes */
  particles?: boolean;
  /** film grain */
  grain?: boolean;
  /** breathing key light from above */
  spotlight?: boolean;
  /** warm amber vs crimson ember vs neutral */
  tone?: "amber" | "ember" | "neutral";
  /** 0..1 overall strength */
  intensity?: number;
}

const TONES = {
  amber: {
    smokeA: "rgba(236, 200, 121, 0.05)",
    smokeB: "rgba(212, 162, 78, 0.04)",
    light: "rgba(255, 241, 209, 0.10)",
  },
  ember: {
    smokeA: "rgba(217, 35, 35, 0.05)",
    smokeB: "rgba(255, 107, 53, 0.035)",
    light: "rgba(255, 226, 195, 0.08)",
  },
  neutral: {
    smokeA: "rgba(244, 239, 230, 0.035)",
    smokeB: "rgba(244, 239, 230, 0.025)",
    light: "rgba(244, 239, 230, 0.075)",
  },
} as const;

/**
 * Layered stage atmosphere: breathing key light, two counter-drifting
 * smoke banks, dust motes and film grain. Pure CSS/canvas — no assets.
 */
export function CinematicAtmosphere({
  className,
  smoke = true,
  particles = true,
  grain = true,
  spotlight = true,
  tone = "amber",
  intensity = 1,
}: CinematicAtmosphereProps) {
  const t = TONES[tone];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity: intensity }}
      aria-hidden="true"
    >
      {spotlight && (
        <div
          className="absolute left-1/2 top-[-30%] h-[90%] w-[130%] -translate-x-1/2"
          style={{
            background: `radial-gradient(ellipse 42% 58% at 50% 0%, ${t.light} 0%, transparent 70%)`,
            animation: "light-breathe 9s ease-in-out infinite",
          }}
        />
      )}

      {smoke && (
        <>
          <div
            className="absolute inset-[-12%]"
            style={{
              background: `radial-gradient(ellipse 55% 42% at 28% 68%, ${t.smokeA} 0%, transparent 65%)`,
              animation: "smoke-drift 26s ease-in-out infinite",
              filter: "blur(30px)",
            }}
          />
          <div
            className="absolute inset-[-12%]"
            style={{
              background: `radial-gradient(ellipse 48% 38% at 74% 42%, ${t.smokeB} 0%, transparent 65%)`,
              animation: "smoke-drift 34s ease-in-out infinite reverse",
              filter: "blur(36px)",
            }}
          />
        </>
      )}

      {particles && <DustParticles tone={tone === "neutral" ? "neutral" : "gold"} />}
      {grain && <div className="grain-overlay" />}
    </div>
  );
}
