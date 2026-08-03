import dynamic from "next/dynamic";
import { HeroAct } from "@/components/acts/HeroAct";
import { LegacyAct } from "@/components/acts/LegacyAct";

const WhyAct = dynamic(() => import("@/components/acts/WhyAct").then((m) => m.WhyAct), { ssr: true });
const JourneyAct = dynamic(() => import("@/components/acts/JourneyAct").then((m) => m.JourneyAct), { ssr: true });
const RewardsAct = dynamic(() => import("@/components/acts/RewardsAct").then((m) => m.RewardsAct), { ssr: true });
const PartnersAct = dynamic(() => import("@/components/acts/PartnersAct").then((m) => m.PartnersAct), { ssr: true });
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then((m) => m.FAQSection), { ssr: true });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then((m) => m.ContactSection), { ssr: true });
const FinalAct = dynamic(() => import("@/components/acts/FinalAct").then((m) => m.FinalAct), { ssr: true });

/**
 * ANTARAGNI '26 — Campus Ambassador
 * A five-act recruitment story:
 *   I. Discovery — the stage reveals itself
 *  II. Amazement — six decades of fire
 * III. Trust — the role, the journey, the partners
 *  IV. Desire — what awaits you
 *   V. Action — the flame needs a face
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-foreground">
      <HeroAct />
      <LegacyAct />
      <WhyAct />
      <JourneyAct />
      <RewardsAct />
      <PartnersAct />
      <FAQSection />
      <ContactSection />
      <FinalAct />
    </main>
  );
}
