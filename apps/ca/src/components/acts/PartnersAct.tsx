"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedText } from "../motion";
import { assets } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

const SPONSOR_GROUPS = [
  {
    title: "TITLE PARTNERS",
    logos: [
      { id: "finlatics", src: assets.sponsors.finlatics, name: "Finlatics" },
    ],
  },
  {
    title: "GOODIES PARTNERS",
    logos: [
      { id: "wrapcart", src: assets.sponsors.wrapcart, name: "Wrapcart" },
      { id: "soxytoes", src: assets.sponsors.soxytoes, name: "Soxytoes" },
      { id: "drewknot", src: assets.sponsors.drewknot, name: "Drewknot" },
    ],
  },
  {
    title: "OUTREACH PARTNERS",
    logos: [
      { id: "oaHelper", src: assets.sponsors.oaHelper, name: "OAHelper – Nxtwave" },
      { id: "productFolks", src: assets.sponsors.productFolks, name: "The Product Folks" },
      { id: "nisarg", src: assets.sponsors.nisarg, name: "Nisarg Srishti Welfare Foundation" },
      { id: "guvi", src: assets.sponsors.guvi, name: "GUVI" },
      { id: "doremonDen", src: assets.sponsors.doremonDen, name: "Doremon Den" },
    ],
  },
];

const chipVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

function LogoChip({ src, name }: { src: string; name: string }) {
  return (
    <motion.div
      variants={chipVariant}
      className="group relative flex h-[150px] w-[180px] items-center justify-center overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.025] transition-colors duration-500 hover:border-gold/40 md:h-[190px] md:w-[230px]"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(ellipse 75% 70% at 50% 100%, rgba(212,162,78,0.14), transparent 70%)",
        }}
      />
      {/* white logo plate — sponsor marks come on white grounds */}
      <div className="relative flex h-[76%] w-[82%] items-center justify-center overflow-hidden rounded-md bg-[#eae7e1] shadow-[0_8px_22px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.04] group-hover:bg-white">
        <div className="relative h-[82%] w-[86%] grayscale transition-all duration-500 group-hover:grayscale-0">
          <Image src={src} alt={name} fill className="object-contain" sizes="230px" />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * ACT III·c — PARTNERS BEHIND THE LEGACY
 * Credibility wall: centre-aligned grid of partner marks, grouped by category.
 */
export function PartnersAct() {
  return (
    <section id="sponsors" className="act border-t border-white/[0.05] bg-surface/60 py-24 md:py-32">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-20">
        {/* header — centred */}
        <div className="mb-14 flex flex-col items-center gap-4 text-center md:mb-20">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
              Our Partners
            </span>
            <span className="h-[1px] w-8 bg-gold" />
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
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="text-[11px] uppercase leading-[2] tracking-[0.2em] text-muted"
          >
            Trusted by brands <span className="text-foreground">who power experiences.</span>
          </motion.p>
        </div>

        {/* centred category grid */}
        <div className="flex flex-col gap-14 md:gap-16">
          {SPONSOR_GROUPS.map((group) => (
            <motion.div
              key={group.title}
              className="flex flex-col items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            >
              {/* category label */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, letterSpacing: "0.4em" },
                  visible: {
                    opacity: 1,
                    letterSpacing: "0.26em",
                    transition: { duration: 1, ease: EASE },
                  },
                }}
                className="mb-7 text-[10px] font-semibold uppercase text-gold md:text-[11px]"
              >
                {group.title}
              </motion.div>

              <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
                {group.logos.map((sponsor) => (
                  <LogoChip key={sponsor.id} src={sponsor.src} name={sponsor.name} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
