"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText, CountUp, CinematicAtmosphere } from "../motion";
import { assets } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Artists who have graced Antaragni stages over the decades */
const ARTISTS = [
  "KSHMR",
  "ADNAN SAMI",
  "SHANKAR–EHSAAN–LOY",
  "SUNIDHI CHAUHAN",
  "FARHAN AKHTAR",
  "AMIT TRIVEDI",
  "MOHIT CHAUHAN",
  "VISHAL–SHEKHAR",
  "NUCLEYA",
  "KAILASH KHER",
  "INDIAN OCEAN",
  "PARIKRAMA",
];

const IMPACT = [
  { value: 60, suffix: "", label: "YEARS", line: "Six decades of stagecraft, since 1965." },
  { value: 150, suffix: "K+", label: "ATTENDEES", line: "A city of students, alive for four nights." },
  { value: 400, suffix: "+", label: "COLLEGES", line: "Campuses across India, one movement." },
];

/**
 * ACT II — AMAZEMENT
 * The scale of the fire. Crowd, artists, numbers.
 */
export function LegacyAct() {
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const crowdY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const crowdScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.02, 1.15]);

  return (
    <section id="legacy" className="act border-t border-white/[0.05] py-24 md:py-36">
      <CinematicAtmosphere tone="ember" intensity={0.6} spotlight={false} />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-20">
        {/* header */}
        <div className="mb-14 flex flex-col gap-4 md:mb-20">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
              The Legacy
            </span>
          </div>
          <h2 className="font-serif uppercase leading-[0.95] text-foreground">
            <AnimatedText
              text="SIX DECADES"
              split="chars"
              stagger={0.035}
              className="block text-[clamp(2.6rem,7vw,5.5rem)]"
            />
            <AnimatedText
              text="OF FIRE"
              split="chars"
              stagger={0.035}
              delay={0.2}
              className="block text-[clamp(2.6rem,7vw,5.5rem)] text-gold-shimmer"
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="max-w-[560px] text-[13px] leading-[1.9] text-muted md:text-[15px]"
          >
            Born in 1965 at IIT Kanpur, Antaragni grew from a campus gathering into
            North India&apos;s largest celebration of culture — four nights where music,
            dance, theatre and 150,000 voices become one.
          </motion.p>
        </div>
      </div>

      {/* ── Cinematic crowd band ── */}
      <div
        ref={bandRef}
        className="relative mx-auto h-[46vh] w-full max-w-[1600px] overflow-hidden md:h-[62vh]"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <motion.div className="absolute inset-0" style={{ y: crowdY, scale: crowdScale }}>
          <Image
            src={assets.spirit.crowd}
            alt="The Antaragni crowd under stage lights"
            fill
            sizes="100vw"
            className="object-cover object-[center_65%]"
          />
        </motion.div>
        {/* grade + dissolve */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        {/* light sweep */}
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              "linear-gradient(100deg, transparent 32%, rgba(255,236,200,0.12) 48%, rgba(255,236,200,0.18) 50%, rgba(255,236,200,0.12) 52%, transparent 68%)",
          }}
          animate={{ x: ["-50%", "50%", "-50%"] }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        />
        {/* floating caption */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <AnimatedText
            text="150,000 VOICES. ONE FLAME."
            split="words"
            stagger={0.08}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/90 md:text-[13px]"
          />
        </div>
      </div>

      {/* ── Artist marquee ── */}
      <div className="relative z-10 mt-16 md:mt-24">
        <p className="mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
          Stages graced by
        </p>
        <div className="marquee-mask w-full overflow-hidden border-y border-white/[0.05] py-6 md:py-8">
          <div className="marquee-track" style={{ "--marquee-duration": "46s" } as React.CSSProperties}>
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
                {ARTISTS.map((artist) => (
                  <span key={`${half}-${artist}`} className="flex items-center">
                    <span className="whitespace-nowrap px-8 font-serif text-2xl uppercase text-foreground/70 transition-colors duration-300 hover:text-gold md:px-12 md:text-4xl">
                      {artist}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Impact numbers ── */}
      <div className="relative z-10 mx-auto mt-20 grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 md:mt-28 md:grid-cols-3 md:gap-8 md:px-10 lg:px-20">
        {IMPACT.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            className="group flex cursor-default flex-col border-l border-gold/25 pl-6 transition-colors duration-500 hover:border-gold/70"
          >
            <span className="font-serif text-[clamp(3.4rem,6vw,5.6rem)] leading-none text-foreground transition-all duration-500 group-hover:text-gold-bright">
              <CountUp value={item.value} duration={2} />
              <span className="text-[0.6em] text-gold">{item.suffix}</span>
            </span>
            <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              {item.label}
            </span>
            <span className="mt-3 max-w-[280px] text-[12px] leading-[1.8] text-muted md:text-[13px]">
              {item.line}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
