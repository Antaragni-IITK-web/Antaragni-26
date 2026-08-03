"use client";

import { DustParticles } from "./DustParticles";

/**
 * Site-wide ambient backdrop, fixed behind all content:
 * three ultra-blurred stage-wash pools drifting on slow loops, and a
 * sparse field of warm embers rising like air above a fire.
 *
 * Sections that want tonal contrast paint translucent surfaces on top,
 * so the atmosphere reads through the whole scroll.
 */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* distant crimson wash — lower left */}
      <div
        className="absolute left-[-20%] top-[55%] h-[80vh] w-[70vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(217,35,35,0.10), transparent 65%)",
          filter: "blur(60px)",
          animation: "wash-drift 46s ease-in-out infinite",
        }}
      />
      {/* gold key wash — upper right */}
      <div
        className="absolute right-[-18%] top-[-12%] h-[75vh] w-[62vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,162,78,0.08), transparent 65%)",
          filter: "blur(70px)",
          animation: "wash-drift 58s ease-in-out infinite reverse",
        }}
      />
      {/* faint ember pool — center, breathes more than it moves */}
      <div
        className="absolute left-[30%] top-[28%] h-[60vh] w-[46vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,107,53,0.06), transparent 65%)",
          filter: "blur(80px)",
          animation: "light-breathe 14s ease-in-out infinite",
        }}
      />

      {/* rising embers */}
      <DustParticles tone="fire" density={0.1} />
    </div>
  );
}
