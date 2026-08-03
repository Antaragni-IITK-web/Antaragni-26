"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "../motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    num: "01",
    title: "APPLY",
    line: "One click. Your name enters the movement.",
  },
  {
    num: "02",
    title: "REPRESENT",
    line: "You become Antaragni's official voice on your campus.",
  },
  {
    num: "03",
    title: "COMPLETE MISSIONS",
    line: "Spread the flame — events, reach, creativity. Every mission earns points.",
  },
  {
    num: "04",
    title: "EARN REWARDS",
    line: "Climb the leaderboard. Unlock passes, merch and recognition.",
  },
  {
    num: "05",
    title: "LIVE ANTARAGNI",
    line: "Walk into the festival you helped build. Pronites included.",
  },
];

/**
 * ACT III·b — THE JOURNEY
 * Scroll-driven timeline from application to the festival gates.
 */
export function JourneyAct() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="act border-t border-white/[0.05] py-24 md:py-36">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-20">
        <div className="mb-16 flex flex-col gap-4 md:mb-24">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
              The Journey
            </span>
          </div>
          <h2 className="font-serif uppercase leading-[0.95] text-foreground">
            <AnimatedText
              text="FROM APPLICATION"
              split="chars"
              stagger={0.03}
              className="block text-[clamp(2.2rem,5.6vw,4.6rem)]"
            />
            <AnimatedText
              text="TO THE FRONT ROW"
              split="chars"
              stagger={0.03}
              delay={0.18}
              className="block text-[clamp(2.2rem,5.6vw,4.6rem)] text-gold-shimmer"
            />
          </h2>
        </div>

        {/* ── Timeline ── */}
        <div ref={trackRef} className="relative">
          {/* Desktop connective line */}
          <div className="absolute left-0 right-0 top-[9px] hidden h-[1px] bg-white/[0.07] md:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent via-gold to-gold-bright"
              style={{ scaleX: lineScale }}
            />
          </div>
          {/* Mobile connective line */}
          <div className="absolute bottom-2 left-[9px] top-2 w-[1px] bg-white/[0.07] md:hidden">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-accent via-gold to-gold-bright"
              style={{ scaleY: lineScale }}
            />
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="group relative flex gap-5 md:flex-col md:gap-0"
              >
                {/* node */}
                <span className="relative z-10 mt-[2px] flex h-[19px] w-[19px] shrink-0 items-center justify-center md:mt-0">
                  <span className="absolute h-full w-full rounded-full border border-gold/40 transition-all duration-500 group-hover:scale-125 group-hover:border-gold" />
                  <span className="h-[7px] w-[7px] rounded-full bg-gold shadow-[0_0_12px_rgba(212,162,78,0.8)]" />
                </span>

                <div className="md:mt-7">
                  <span className="font-serif text-3xl leading-none text-white/[0.13] transition-colors duration-500 group-hover:text-gold/50 md:text-4xl">
                    {step.num}
                  </span>
                  <h3 className="mt-2 font-serif text-[13px] font-bold uppercase tracking-[0.2em] text-foreground md:mt-3 md:text-[14px]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[260px] text-[12px] leading-[1.8] text-muted md:mt-3 md:text-[13px]">
                    {step.line}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
