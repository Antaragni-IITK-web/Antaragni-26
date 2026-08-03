"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStore } from "@repo/store";
import { firebaseGoogleSignIn, firebaseGetUser } from "@repo/firebase";
import { AnimatedText, CountUp, CinematicAtmosphere, MagneticButton } from "../motion";
import { assets } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: 60, suffix: "", label: "YEARS OF LEGACY" },
  { value: 150, suffix: "K+", label: "ATTENDEES" },
  { value: 400, suffix: "+", label: "COLLEGES" },
  { value: 1, suffix: "M+", label: "DIGITAL REACH" },
];

/**
 * ACT I — DISCOVERY
 * Black stage. The key light breathes on. The name appears.
 * "The stage is bigger than you imagine."
 */
export function HeroAct() {
  const router = useRouter();
  const { user, setUser, setLoading } = useStore();
  const { scrollY } = useScroll();

  // depth layers drift apart on scroll
  const silhouetteY = useTransform(scrollY, [0, 800], [0, 90]);
  const lightY = useTransform(scrollY, [0, 800], [0, 40]);
  const fadeOut = useTransform(scrollY, [0, 600], [1, 0]);

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
    <section id="home" className="act flex min-h-[100svh] flex-col">
      {/* ── Stage atmosphere ── */}
      <CinematicAtmosphere tone="amber" intensity={0.9} />

      {/* ── The performer under the light ── */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] md:block"
        style={{ y: silhouetteY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, delay: 0.6, ease: EASE }}
      >
        <div
          className="relative h-full w-full"
          style={{
            maskImage: "radial-gradient(ellipse 52% 52% at 52% 55%, black 32%, transparent 74%)",
            WebkitMaskImage: "radial-gradient(ellipse 52% 52% at 52% 55%, black 32%, transparent 74%)",
          }}
        >
          <Image
            src={assets.hero.silhouette}
            alt="A performer standing under a single spotlight"
            fill
            priority
            sizes="52vw"
            className="object-contain object-center opacity-80"
          />
        </div>
        {/* warm key light cone above the figure */}
        <motion.div
          className="absolute left-1/2 top-[2%] h-[70%] w-[70%] -translate-x-1/2 mix-blend-screen"
          style={{
            y: lightY,
            background:
              "radial-gradient(ellipse 30% 62% at 50% 0%, rgba(255,236,200,0.14) 0%, rgba(255,224,178,0.05) 45%, transparent 72%)",
            animation: "light-breathe 8s ease-in-out infinite",
          }}
        />
      </motion.div>

      {/* mobile: silhouette as dim backdrop */}
      <div className="pointer-events-none absolute inset-0 md:hidden">
        <div
          className="relative h-full w-full opacity-40"
          style={{
            maskImage: "radial-gradient(ellipse 70% 55% at 50% 62%, black 30%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 62%, black 30%, transparent 78%)",
          }}
        >
          <Image
            src={assets.hero.silhouette}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
        </div>
      </div>

      {/* ── Copy ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pb-40 pt-28 md:px-10 md:pb-44 lg:px-20">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-[1px] w-8 bg-gold" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
            IIT Kanpur · Since 1965
          </span>
        </motion.div>

        {/* wordmark */}
        <h1 className="font-serif uppercase leading-[0.92] text-foreground">
          <AnimatedText
            text="ANTARAGNI"
            split="chars"
            stagger={0.05}
            delay={0.45}
            duration={1.1}
            className="block whitespace-nowrap text-[clamp(3rem,11vw,10rem)] -tracking-[0.02em]"
          />
        </h1>

        {/* the promise — co-headline under the wordmark */}
        <div className="mt-4 max-w-[900px] md:mt-5">
          <AnimatedText
            text={["CAMPUS AMBASSADOR", "PROGRAM"]}
            split="lines"
            stagger={0.14}
            delay={1.1}
            className="font-sans text-[clamp(1.4rem,3.75vw,3.4rem)] font-semibold uppercase leading-[1.12] tracking-[0.1em] text-foreground"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: EASE }}
            className="mt-6 max-w-[480px] font-serif text-[13px] leading-[1.9] text-muted md:mt-8 md:text-[15px]"
          >
            Become the face of North India&apos;s largest cultural festival.
            Lead your campus. Wear the flame.{" "}
            <span className="text-gold">This is not promotion — it&apos;s a movement.</span>
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-5 md:mt-12"
        >
          <MagneticButton onClick={handleApply} variant="solid" strength={0.4}>
            {user ? "Enter Your HQ" : "Apply Now"}
          </MagneticButton>
          <MagneticButton href="#legacy" strength={0.3}>
            Discover the Legacy
          </MagneticButton>
        </motion.div>
      </div>

      {/* ── Stat strip pinned to hero base ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 border-t border-white/[0.06] bg-black/30 backdrop-blur-sm"
        style={{ opacity: fadeOut }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2, ease: EASE }}
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-6 px-6 py-6 md:grid-cols-4 md:px-10 md:py-7 lg:px-20">
          {STATS.map((s) => (
            <div key={s.label} className="group flex cursor-default flex-col gap-1">
              <span className="font-serif text-3xl leading-none text-gold transition-all duration-500 group-hover:[text-shadow:0_0_26px_rgba(212,162,78,0.55)] md:text-4xl">
                <CountUp value={s.value} duration={2} delay={2.3} />
                <span className="text-[0.72em]">{s.suffix}</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.26em] text-muted md:text-[10px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        style={{ opacity: fadeOut }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.2 }}
      >
        <span className="h-10 w-[1px] overflow-hidden bg-white/10">
          <span className="block h-full w-full bg-gold" style={{ animation: "cue-drop 2.4s ease-in-out infinite" }} />
        </span>
      </motion.div>
    </section>
  );
}
