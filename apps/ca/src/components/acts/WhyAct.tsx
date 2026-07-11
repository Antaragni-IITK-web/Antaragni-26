"use client";

import { motion } from "framer-motion";
import { AnimatedText, SpotlightCard } from "../motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  {
    num: "01",
    title: "LEAD YOUR CAMPUS",
    line: "You are Antaragni where you study. The events, the buzz, the crowd that shows up — that's your doing.",
    glow: "crimson" as const,
  },
  {
    num: "02",
    title: "BUILD A NATIONAL NETWORK",
    line: "Ambassadors in 400+ colleges. Organisers, artists, sponsors. The people you meet here follow you for life.",
    glow: "gold" as const,
  },
  {
    num: "03",
    title: "REPRESENT IIT KANPUR",
    line: "Sixty years of legacy, carried forward with your name attached to it. That signature travels.",
    glow: "gold" as const,
  },
  {
    num: "04",
    title: "CREATE YOUR LEGACY",
    line: "Certificates fade into drawers. The story of leading a movement on your campus doesn't.",
    glow: "crimson" as const,
  },
];

/**
 * ACT III·a — WHY WEAR THE FLAME
 * Four emotional reasons, not a benefits list.
 */
export function WhyAct() {
  return (
    <section id="why" className="act border-t border-white/[0.05] bg-surface py-24 md:py-36">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-20">
        <div className="mb-14 flex flex-col gap-4 md:mb-20">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
              The Role
            </span>
          </div>
          <h2 className="font-serif uppercase leading-[0.95] text-foreground">
            <AnimatedText
              text="WHY WEAR"
              split="chars"
              stagger={0.035}
              className="block text-[clamp(2.6rem,7vw,5.5rem)]"
            />
            <AnimatedText
              text="THE FLAME"
              split="chars"
              stagger={0.035}
              delay={0.2}
              className="block text-[clamp(2.6rem,7vw,5.5rem)] text-accent"
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: EASE }}
            >
              <SpotlightCard glow={p.glow} className="h-full">
                <div className="flex h-full flex-col p-7 md:p-9">
                  <span className="font-serif text-4xl text-white/[0.13] transition-colors duration-500 group-hover:text-gold/40 md:text-5xl">
                    {p.num}
                  </span>
                  <h3 className="mt-5 font-serif text-[15px] font-bold uppercase tracking-[0.18em] text-foreground md:text-[17px]">
                    {p.title}
                  </h3>
                  <span className="mt-3 h-[1px] w-10 origin-left bg-gold/50 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
                  <p className="mt-4 text-[13px] leading-[1.85] text-muted md:text-[14px]">
                    {p.line}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
