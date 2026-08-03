"use client";

import { motion } from "framer-motion";
import { useStore } from "@repo/store";
import { CountUp } from "../motion/CountUp";

/** Ambassador tiers — thresholds in points */
const TIERS = [
  { name: "Rising Ambassador", min: 0 },
  { name: "Torch Bearer", min: 100 },
  { name: "Flame Keeper", min: 300 },
  { name: "Legend of the Stage", min: 600 },
];

function getTier(points: number) {
  const idx = TIERS.reduce((acc, t, i) => (points >= t.min ? i : acc), 0);
  const current = TIERS[idx]!;
  const next = TIERS[idx + 1];
  const progress = next
    ? Math.min(1, (points - current.min) / (next.min - current.min))
    : 1;
  return { current, next, progress };
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProfileTab() {
  const { user } = useStore();
  const data = user?.details;

  if (!data) return <div className="p-10 text-white/50 text-center">Loading profile...</div>;

  const points = Number(data.points ?? 0) || 0;
  const { current, next, progress } = getTier(points);
  const initial = (data.name ?? "?").trim().charAt(0).toUpperCase();

  return (
    <div className="flex w-full flex-col gap-6">
      {/* ── Ambassador status card ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative w-full overflow-hidden rounded-xl border border-gold/25 bg-gradient-to-br from-gold/[0.07] via-white/[0.02] to-transparent p-6 backdrop-blur-md md:p-8"
      >
        {/* warm glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,162,78,0.15), transparent 70%)" }}
        />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-black/40 font-serif text-2xl text-gold shadow-[0_0_24px_rgba(212,162,78,0.25)] md:h-20 md:w-20 md:text-3xl">
              {initial}
            </div>
            <div className="min-w-0">
              <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-gold md:text-[10px]">
                {current.name}
              </div>
              <h2 className="truncate font-serif text-xl text-foreground md:text-3xl">{data.name}</h2>
              <div className="mt-1 truncate text-[11px] uppercase tracking-[0.16em] text-muted">
                {data.college}
              </div>
            </div>
          </div>

          {/* Legacy Score */}
          <div className="flex shrink-0 flex-col md:items-end">
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-muted md:text-[10px]">
              Legacy Score
            </span>
            <span className="font-serif text-4xl leading-none text-foreground md:text-5xl">
              <CountUp value={points} duration={1.4} />
            </span>
          </div>
        </div>

        {/* Progress to next tier */}
        <div className="relative z-10 mt-7">
          <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-muted md:text-[10px]">
            <span>{current.name}</span>
            <span>{next ? `${next.min - points} pts to ${next.name}` : "Maximum tier reached"}</span>
          </div>
          <div className="h-[5px] w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="relative h-full rounded-full bg-gradient-to-r from-accent via-ember to-gold"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(progress * 100, 2)}%` }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            />
          </div>
          {/* tier milestones */}
          <div className="mt-3 hidden items-center justify-between md:flex">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] ${
                  points >= t.min ? "text-gold" : "text-white/25"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    points >= t.min ? "bg-gold shadow-[0_0_8px_rgba(212,162,78,0.8)]" : "bg-white/15"
                  }`}
                />
                {t.name}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Detail grid ────────────────────────────────────────────── */}
      <div className="w-full border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-8 md:p-10 relative">
      {/* Outer row wrapper with a single continuous vertical line */}
      <div className="flex flex-col relative w-full">
        {/* Continuous Vertical Divider */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

        {/* Row 1: CA ID & Full Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/5 min-h-[72px]">
          {/* Left: CA ID */}
          <div className="flex items-center gap-5 py-4 md:pr-8">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent/20 rounded-lg text-accent bg-accent/[0.03]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25zm.002-12h9.75v10.5H4.5V7.5z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-white/40 uppercase leading-none">
                CA ID
              </span>
              <span className="text-[14px] md:text-[15px] font-serif font-medium text-white mt-1.5 truncate" title={data.id}>
                {data.id}
              </span>
            </div>
          </div>
          
          {/* Right: Full Name */}
          <div className="flex items-center gap-5 py-4 md:pl-8">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent/20 rounded-lg text-accent bg-accent/[0.03]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-white/40 uppercase leading-none">
                Full Name
              </span>
              <span className="text-[14px] md:text-[15px] font-serif font-medium text-white mt-1.5 truncate" title={data.name}>
                {data.name}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Email ID & Mobile Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/5 min-h-[72px]">
          {/* Left: Email ID */}
          <div className="flex items-center gap-5 py-4 md:pr-8">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent/20 rounded-lg text-accent bg-accent/[0.03]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-white/40 uppercase leading-none">
                Email ID
              </span>
              <span className="text-[14px] md:text-[15px] font-serif font-medium text-white mt-1.5 truncate" title={data.email}>
                {data.email}
              </span>
            </div>
          </div>
          
          {/* Right: Mobile Number */}
          <div className="flex items-center gap-5 py-4 md:pl-8">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent/20 rounded-lg text-accent bg-accent/[0.03]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.432-5.11-3.718-6.542-6.542l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-white/40 uppercase leading-none">
                Mobile Number
              </span>
              <span className="text-[14px] md:text-[15px] font-serif font-medium text-white mt-1.5 truncate" title={data.phone}>
                {data.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Row 3: WhatsApp Number & College / University */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/5 min-h-[72px]">
          {/* Left: WhatsApp Number */}
          <div className="flex items-center gap-5 py-4 md:pr-8">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent/20 rounded-lg text-accent bg-accent/[0.03]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-white/40 uppercase leading-none">
                WhatsApp Number
              </span>
              <span className="text-[14px] md:text-[15px] font-serif font-medium text-white mt-1.5 truncate" title={data.whatsapp}>
                {data.whatsapp}
              </span>
            </div>
          </div>
          
          {/* Right: College / University */}
          <div className="flex items-center gap-5 py-4 md:pl-8">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent/20 rounded-lg text-accent bg-accent/[0.03]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M12 12.75h9m-9 0H3m9-9L3 8.25m9-4.5l9 4.5M3 8.25v10.5m18-10.5v10.5M3 18.75h18M10.5 21v-8.25m3 8.25v-8.25m-6 8.25v-8.25m9 8.25v-8.25" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-white/40 uppercase leading-none">
                College / University
              </span>
              <span className="text-[14px] md:text-[15px] font-serif font-medium text-white mt-1.5 truncate" title={data.college}>
                {data.college}
              </span>
            </div>
          </div>
        </div>

        {/* Row 4: College City & Year of Study */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/5 min-h-[72px]">
          {/* Left: College City */}
          <div className="flex items-center gap-5 py-4 md:pr-8">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent/20 rounded-lg text-accent bg-accent/[0.03]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-white/40 uppercase leading-none">
                College City
              </span>
              <span className="text-[14px] md:text-[15px] font-serif font-medium text-white mt-1.5 truncate" title={data.collegeCity}>
                {data.collegeCity}
              </span>
            </div>
          </div>
          
          {/* Right: Year of Study */}
          <div className="flex items-center gap-5 py-4 md:pl-8">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent/20 rounded-lg text-accent bg-accent/[0.03]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-white/40 uppercase leading-none">
                Year of Study
              </span>
              <span className="text-[14px] md:text-[15px] font-serif font-medium text-white mt-1.5 truncate" title={data.year}>
                {data.year}
              </span>
            </div>
          </div>
        </div>

        {/* Row 5: Postal Address & Referral Code (No bottom border, dynamically wraps Address and vertical centers cells) */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[72px]">
          {/* Left: Postal Address (Allowed to wrap and grow) */}
          <div className="flex items-center gap-5 py-4 md:pr-8">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-accent/20 rounded-lg text-accent bg-accent/[0.03]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-white/40 uppercase leading-none">
                Postal Address
              </span>
              <span className="text-[14px] md:text-[15px] font-serif font-medium text-white mt-1.5 leading-relaxed break-words" title={data.address}>
                {data.address}
              </span>
            </div>
          </div>
          
          {/* Right side remains intentionally empty */}
          <div className="hidden md:block py-4 md:pl-8" />
        </div>

      </div>
      </div>
    </div>
  );
}
