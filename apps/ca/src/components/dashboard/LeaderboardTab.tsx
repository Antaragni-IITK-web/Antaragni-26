"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSortedData } from "@repo/firebase";
import { useStore } from "@repo/store";
import { CountUp } from "../motion/CountUp";
import toast from "react-hot-toast";

interface LeaderboardEntry {
  rank: number;
  id?: string;
  name: string;
  points: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Podium column for the top 3 — center pedestal is the champion. */
function PodiumSpot({ entry, isUser }: { entry?: LeaderboardEntry; isUser: boolean }) {
  if (!entry) return <div className="flex-1" />;
  const isFirst = entry.rank === 1;
  const height = isFirst ? "h-36 md:h-44" : entry.rank === 2 ? "h-24 md:h-32" : "h-20 md:h-24";
  const glow = isFirst
    ? "shadow-[0_0_44px_rgba(212,162,78,0.22)] border-gold/60"
    : "shadow-[0_0_20px_rgba(212,162,78,0.08)] border-gold/25";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: isFirst ? 0.15 : entry.rank * 0.12 }}
      className="flex flex-1 flex-col items-center justify-end gap-3"
    >
      {/* name + points */}
      <div className="flex flex-col items-center px-1 text-center">
        {isFirst && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 14 }}
            className="mb-2 text-gold"
            aria-hidden
          >
            {/* flame mark for the champion */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path
                d="M12 3 C12.5 8 17 10.5 17 15 C17 18.6 14.8 21 12 21 C9.2 21 7 18.6 7 15 C7 11.8 9.5 10 10 7.5 C11 9 11.7 10.4 11.3 12 C13 11 12.4 6.5 12 3 Z"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </motion.span>
        )}
        <span
          className={`max-w-[130px] truncate font-serif text-[11px] font-bold uppercase tracking-[0.1em] md:max-w-[180px] md:text-[13px] ${
            isUser ? "text-gold" : "text-foreground"
          }`}
          title={entry.name}
        >
          {entry.name}
        </span>
        <span className="mt-1 font-serif text-lg leading-none text-foreground/90 md:text-2xl">
          <CountUp value={entry.points} duration={1.4} delay={0.4} />
        </span>
      </div>

      {/* pedestal */}
      <div
        className={`relative w-full overflow-hidden rounded-t-lg border border-b-0 bg-gradient-to-t from-white/[0.01] to-gold/[0.09] ${height} ${glow}`}
      >
        <span className="absolute inset-x-0 top-0 h-[1px] bg-gold/60" />
        <span className="absolute inset-0 flex items-start justify-center pt-3 font-serif text-3xl text-white/20 md:pt-4 md:text-5xl">
          {entry.rank}
        </span>
      </div>
    </motion.div>
  );
}

export function LeaderboardTab() {
  const [data, setData] = useState<Array<LeaderboardEntry>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useStore();
  const myId = user?.details?.id;

  const getAllCAs = async () => {
    try {
      const fbData = await getSortedData("CAs26", "points", 20);
      if (fbData != null) {
        const entries = fbData.map((ca: any, index: number) => ({
          rank: index + 1,
          id: ca.data.id,
          name: ca.data.name,
          points: ca.data.points,
        }));
        setData(entries);
      }
    } catch (error) {
      // [SECURITY] Do not expose raw Firebase error to user
      console.error("Leaderboard fetch error:", error);
      toast.error("Could not load the leaderboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCAs();
  }, []);

  const [first, second, third] = [data[0], data[1], data[2]];
  const rest = data.slice(3);
  const isMe = (e?: LeaderboardEntry) => Boolean(e && myId && e.id === myId);

  return (
    <div className="relative min-h-[400px] w-full rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md md:p-8">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm text-white/50">Loading Leaderboard...</div>
        </div>
      ) : (
        <div className="flex w-full flex-col">
          {/* ── Podium ─────────────────────────────────────────────── */}
          {data.length > 0 && (
            <div className="mb-10 mt-2 flex items-end gap-3 px-2 md:gap-6 md:px-10">
              <PodiumSpot entry={second} isUser={isMe(second)} />
              <PodiumSpot entry={first} isUser={isMe(first)} />
              <PodiumSpot entry={third} isUser={isMe(third)} />
            </div>
          )}

          {/* ── Standings ──────────────────────────────────────────── */}
          <div className="grid grid-cols-12 border-b border-white/5 px-6 pb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 md:px-8">
            <div className="col-span-2">RANK</div>
            <div className="col-span-7 md:col-span-8">NAMES</div>
            <div className="col-span-3 text-right md:col-span-2">POINTS</div>
          </div>

          <div className="mt-2 flex flex-col">
            {rest.map((entry, i) => {
              const mine = isMe(entry);
              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.045 }}
                  className={`grid min-h-[56px] grid-cols-12 items-center border-b border-white/5 px-6 py-4 transition-all duration-200 last:border-none md:px-8 ${
                    mine
                      ? "rounded-lg border border-gold/40 bg-gold/[0.07] shadow-[0_0_24px_rgba(212,162,78,0.12)]"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className={`col-span-2 font-serif text-[15px] font-bold leading-none md:text-[16px] ${mine ? "text-gold" : "text-white/70"}`}>
                    {entry.rank}
                  </div>
                  <div className={`col-span-7 truncate font-serif text-[14px] font-bold uppercase leading-none tracking-[0.08em] md:col-span-8 md:text-[15px] ${mine ? "text-foreground" : "text-white/90"}`}>
                    {entry.name}
                    {mine && (
                      <span className="ml-3 rounded-full border border-gold/50 px-2 py-0.5 text-[9px] tracking-[0.2em] text-gold">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className={`col-span-3 text-right font-serif text-[14px] font-bold leading-none tracking-wider md:col-span-2 md:text-[15px] ${mine ? "text-gold" : "text-white/90"}`}>
                    {entry.points}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
