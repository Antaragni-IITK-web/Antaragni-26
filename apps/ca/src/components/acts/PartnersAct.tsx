"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

type Partner = { id: string; src: string; name: string };

const TIERS: { id: string; heading: string; partners: Partner[] }[] = [
  {
    id: "title",
    heading: "Title Partners",
    partners: [
      { id: "intrcity", src: assets.sponsors.intrcity, name: "Intrcity" },
      { id: "vskills", src: assets.sponsors.vskills, name: "vSkills" },
    ],
  },
  {
    id: "goodies",
    heading: "Goodies Partners",
    partners: [
      { id: "swashaa", src: assets.sponsors.swashaa, name: "Swashaa" },
      { id: "urbanDrift", src: assets.sponsors.urbanDrift, name: "Urban Drift" },
      { id: "supervek", src: assets.sponsors.supervek, name: "Supervek" },
    ],
  },
  {
    id: "outreach",
    heading: "Outreach Partners",
    partners: [
      { id: "easyShiksha", src: assets.sponsors.easyShiksha, name: "EasyShiksha" },
      { id: "productFolks", src: assets.sponsors.productFolks, name: "The Product Folks" },
    ],
  },
];

function LogoCard({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex aspect-square h-[120px] w-[120px] items-center justify-center rounded-md border border-white/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_18px_48px_rgba(0,0,0,0.7)] sm:h-[136px] sm:w-[136px] md:h-[150px] md:w-[150px] md:p-6">
      <div className="relative h-full w-full">
        <Image src={src} alt={name} fill className="object-contain" sizes="150px" />
      </div>
    </div>
  );
}

/**
 * ACT III·c — PARTNERS BEHIND THE LEGACY
 * Editorial credibility wall: three centered partner tiers on pure black.
 */
export function PartnersAct() {
  return (
    <section id="sponsors" className="act border-t border-white/[0.05] bg-black">
      {TIERS.map((tier, i) => (
        <div key={tier.id} className={i > 0 ? "border-t border-white/[0.12]" : undefined}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-20"
          >
            <h3 className="text-center text-[16px] font-semibold uppercase tracking-[0.4em] text-accent md:text-[17px]">
              {tier.heading}
            </h3>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:mt-16 lg:gap-24 xl:gap-36">
              {tier.partners.map((p) => (
                <LogoCard key={p.id} src={p.src} name={p.name} />
              ))}
            </div>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
