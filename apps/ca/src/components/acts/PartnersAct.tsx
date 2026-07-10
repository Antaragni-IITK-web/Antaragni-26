"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedText } from "../motion";
import { assets } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

const PARTNERS = [
  { id: "intrcity", src: assets.sponsors.intrcity, name: "Intrcity" },
  { id: "vskills", src: assets.sponsors.vskills, name: "vSkills" },
  { id: "easyShiksha", src: assets.sponsors.easyShiksha, name: "EasyShiksha" },
  { id: "swashaa", src: assets.sponsors.swashaa, name: "Swashaa" },
  { id: "urbanDrift", src: assets.sponsors.urbanDrift, name: "Urban Drift" },
  { id: "productFolks", src: assets.sponsors.productFolks, name: "The Product Folks" },
  { id: "supervek", src: assets.sponsors.supervek, name: "Supervek" },
];

function LogoChip({ src, name }: { src: string; name: string }) {
  return (
    <div className="group relative mx-3 flex h-[92px] w-[170px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.025] transition-colors duration-500 hover:border-gold/40 md:mx-4 md:h-[108px] md:w-[210px]">
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(ellipse 75% 70% at 50% 100%, rgba(212,162,78,0.14), transparent 70%)",
        }}
      />
      {/* white logo plate — sponsor marks come on white grounds */}
      <div className="relative flex h-[68%] w-[78%] items-center justify-center overflow-hidden rounded-md bg-[#eae7e1] shadow-[0_8px_22px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.04] group-hover:bg-white">
        <div className="relative h-[78%] w-[84%] grayscale transition-all duration-500 group-hover:grayscale-0">
          <Image src={src} alt={name} fill className="object-contain" sizes="210px" />
        </div>
      </div>
    </div>
  );
}

/**
 * ACT III·c — PARTNERS BEHIND THE LEGACY
 * Credibility wall: infinite marquee of partner marks.
 */
export function PartnersAct() {
  return (
    <section id="sponsors" className="act border-t border-white/[0.05] bg-surface py-24 md:py-32">
      <div className="relative z-10 mx-auto mb-12 flex w-full max-w-[1440px] flex-col items-start justify-between gap-6 px-6 md:mb-16 md:flex-row md:items-end md:px-10 lg:px-20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
              Our Partners
            </span>
          </div>
          <h2 className="font-serif uppercase leading-[0.95] text-foreground">
            <AnimatedText
              text="PARTNERS BEHIND"
              split="chars"
              stagger={0.03}
              className="block text-[clamp(2rem,5vw,4rem)]"
            />
            <AnimatedText
              text="THE LEGACY"
              split="chars"
              stagger={0.03}
              delay={0.16}
              className="block text-[clamp(2rem,5vw,4rem)] text-gold-shimmer"
            />
          </h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="max-w-[300px] text-[11px] uppercase leading-[2] tracking-[0.2em] text-muted md:text-right"
        >
          Trusted by brands
          <br />
          <span className="text-foreground">who power experiences.</span>
        </motion.p>
      </div>

      {/* marquee row 1 */}
      <div className="marquee-mask w-full overflow-hidden py-3">
        <div className="marquee-track" style={{ "--marquee-duration": "38s" } as React.CSSProperties}>
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
              {PARTNERS.map((p) => (
                <LogoChip key={`${half}-${p.id}`} src={p.src} name={p.name} />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* marquee row 2 — reverse drift */}
      <div className="marquee-mask w-full overflow-hidden py-3" style={{ direction: "rtl" }}>
        <div className="marquee-track" style={{ "--marquee-duration": "46s" } as React.CSSProperties}>
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
              {[...PARTNERS].reverse().map((p) => (
                <LogoChip key={`${half}-${p.id}`} src={p.src} name={p.name} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
