"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedText, CinematicAtmosphere } from "../motion";
import { assets } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

const REWARDS = [
  {
    num: "01",
    kicker: "RECOGNITION",
    title: "The Certificate",
    line: "Official recognition from IIT Kanpur — proof, with a seal on it, that you led a movement on your campus.",
    image: assets.incentives.certificate,
    imageAlt: "Official Campus Ambassador certificate",
  },
  {
    num: "02",
    kicker: "EXPERIENCE",
    title: "Pronite Passes",
    line: "The headline nights, from the front. Not bought — earned. You walk in knowing you helped fill the ground.",
    image: assets.incentives.pass,
    imageAlt: "Pronite pass",
  },
  {
    num: "03",
    kicker: "IDENTITY",
    title: "Ambassador Merch",
    line: "The official drop, reserved for the crew. When you wear the flame, your campus knows who carries it.",
    image: assets.incentives.merchandise,
    imageAlt: "Official Antaragni merchandise",
  },
  {
    num: "04",
    kicker: "OPPORTUNITY",
    title: "The Network",
    line: "Internships, letters, people. Doors that stay open long after the stage lights go down.",
    image: assets.incentives.opportunities,
    imageAlt: "Opportunities and networking",
  },
];

/**
 * ACT IV — DESIRE
 * "What awaits you" — rewards framed as honors earned, each under
 * its own pool of light.
 */
export function RewardsAct() {
  return (
    <section id="rewards" className="act border-t border-white/[0.05] bg-background py-24 md:py-36">
      <CinematicAtmosphere tone="amber" intensity={0.55} spotlight={false} />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-20">
        {/* header */}
        <div className="mb-16 flex flex-col gap-4 md:mb-28">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
              The Rewards
            </span>
          </div>
          <h2 className="font-serif uppercase leading-[0.95] text-foreground">
            <AnimatedText
              text="WHAT AWAITS"
              split="chars"
              stagger={0.035}
              className="block text-[clamp(2.6rem,7vw,5.5rem)]"
            />
            <AnimatedText
              text="YOU"
              split="chars"
              stagger={0.035}
              delay={0.2}
              className="block text-[clamp(2.6rem,7vw,5.5rem)] text-gold-shimmer"
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="max-w-[520px] text-[13px] leading-[1.9] text-muted md:text-[15px]"
          >
            Nothing here is given away. Every reward is earned mission by mission —
            which is exactly why it means something.
          </motion.p>
        </div>

        {/* rewards */}
        <div className="flex flex-col gap-20 md:gap-28">
          {REWARDS.map((reward, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={reward.num}
                className={`flex flex-col items-center gap-10 md:gap-16 ${
                  flip ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* item under its pool of light */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="relative flex w-full max-w-[420px] items-center justify-center md:w-1/2"
                >
                  {/* light pool */}
                  <div
                    className="absolute inset-0 -z-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 55% 48% at 50% 42%, rgba(255,236,200,0.09) 0%, transparent 70%)",
                      animation: "light-breathe 9s ease-in-out infinite",
                    }}
                  />
                  <motion.div
                    className="relative aspect-square w-[72%] md:w-[80%]"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 7 + i, ease: "easeInOut", repeat: Infinity }}
                  >
                    <Image
                      src={reward.image}
                      alt={reward.imageAlt}
                      fill
                      sizes="(max-width: 768px) 70vw, 33vw"
                      className="object-contain drop-shadow-[0_36px_60px_rgba(0,0,0,0.9)]"
                    />
                  </motion.div>
                  {/* floor shadow */}
                  <div className="absolute bottom-[4%] left-1/2 h-4 w-[52%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-md" />
                </motion.div>

                {/* copy */}
                <motion.div
                  initial={{ opacity: 0, x: flip ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                  className="flex w-full flex-col md:w-1/2"
                >
                  <span className="font-serif text-5xl text-white/[0.1] md:text-6xl">{reward.num}</span>
                  <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                    {reward.kicker}
                  </span>
                  <h3 className="mt-3 font-serif text-3xl uppercase text-foreground md:text-5xl">
                    {reward.title}
                  </h3>
                  <span className="rule-gold mt-5 w-24" />
                  <p className="mt-5 max-w-[440px] text-[13px] leading-[1.9] text-muted md:text-[15px]">
                    {reward.line}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
