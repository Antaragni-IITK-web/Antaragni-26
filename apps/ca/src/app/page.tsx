import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { SpiritSection } from "@/components/sections/SpiritSection";

const IncentivesSection = dynamic(() => import("@/components/sections/IncentivesSection").then((mod) => mod.IncentivesSection), { ssr: true });
const ExpectationsSection = dynamic(() => import("@/components/sections/ExpectationsSection").then((mod) => mod.ExpectationsSection), { ssr: true });
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then((mod) => mod.FAQSection), { ssr: true });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then((mod) => mod.ContactSection), { ssr: true });
const SponsorsSection = dynamic(() => import("@/components/sections/SponsorsSection").then((mod) => mod.SponsorsSection), { ssr: true });
const FinalCtaSection = dynamic(() => import("@/components/sections/FinalCtaSection").then((mod) => mod.FinalCtaSection), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroSection />
      <SpiritSection />
      <IncentivesSection />
      <ExpectationsSection />
      <FAQSection />
      <SponsorsSection />
      <ContactSection />
      <FinalCtaSection />
    </main>
  );
}
