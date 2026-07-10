"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStore } from "@repo/store";
import { firebaseGoogleSignIn, firebaseGetUser } from "@repo/firebase";
import { AnimatedText, CinematicAtmosphere, MagneticButton } from "../motion";
import { assets } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ACT V — ACTION
 * The house lights drop one last time. One figure. One question.
 */
export function FinalAct() {
  const router = useRouter();
  const { user, setUser, setLoading } = useStore();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const figureY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const handleApply = async () => {
    if (user) {
      router.push("/dashboard");
      return;
    }
    const result = await firebaseGoogleSignIn();
    if (result) {
      await firebaseGetUser("CAs26", setUser, setLoading);
      router.push("/dashboard");
    }
  };

  return (
    <section
      ref={ref}
      id="apply"
      className="act flex min-h-[100svh] flex-col justify-between border-t border-white/[0.05] bg-black"
    >
      <CinematicAtmosphere tone="ember" intensity={0.85} />

      {/* the last figure on stage */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: figureY }}>
        <Image
          src={assets.cta.silhouette}
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-bottom opacity-70 grayscale contrast-125 brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        {/* crimson floor glow */}
        <div
          className="absolute inset-x-0 bottom-0 h-[45%]"
          style={{
            background: "radial-gradient(ellipse 55% 70% at 50% 100%, rgba(217,35,35,0.16), transparent 70%)",
          }}
        />
      </motion.div>

      {/* headline */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-6 pt-32 text-center md:px-10">
        <AnimatedText
          text="THE FLAME NEEDS"
          split="chars"
          stagger={0.03}
          className="block font-serif text-[clamp(2.4rem,7.5vw,6.5rem)] uppercase leading-[0.95] text-foreground"
        />
        <AnimatedText
          text="A FACE."
          split="chars"
          stagger={0.045}
          delay={0.35}
          className="mt-1 block font-serif text-[clamp(2.4rem,7.5vw,6.5rem)] uppercase leading-[0.95] text-gold-shimmer"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="mt-7 max-w-[440px] text-[12px] uppercase leading-[2.1] tracking-[0.22em] text-muted md:text-[13px]"
        >
          On your campus, that face is yours.
          <br />
          <span className="text-foreground">The legacy continues with you.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE }}
          className="mt-12"
        >
          <MagneticButton onClick={handleApply} variant="solid" strength={0.45} className="px-14 py-5 lg:px-20 lg:py-6">
            {user ? "Enter Your HQ" : "Become the Face — Apply Now"}
          </MagneticButton>
        </motion.div>
      </div>

      {/* footer strip */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-white/[0.06] px-6 py-7 md:flex-row md:px-10 lg:px-20">
        <span className="text-[10px] uppercase tracking-[0.26em] text-muted">
          Antaragni &apos;26 · IIT Kanpur
        </span>
        <span className="text-[10px] uppercase tracking-[0.26em] text-muted">
          Campus Ambassador Program
        </span>
        <span className="text-[10px] uppercase tracking-[0.26em] text-gold">
          Est. 1965
        </span>
      </div>
    </section>
  );
}
