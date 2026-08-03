"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SplitMode = "chars" | "words" | "lines";

interface AnimatedTextProps {
  text: string | string[];
  split?: SplitMode;
  className?: string;
  as?: React.ElementType;
  /** seconds between each unit */
  stagger?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/**
 * Editorial mask-reveal text. Units (chars/words/lines) rise from behind
 * a clipping mask with a premium stagger — the signature reveal of the site.
 */
export function AnimatedText({
  text,
  split = "words",
  className,
  as: Component = "span",
  stagger = 0.05,
  delay = 0,
  duration = 0.9,
  once = true,
}: AnimatedTextProps) {
  const lines = Array.isArray(text) ? text : [text];
  const units: string[] =
    split === "lines"
      ? lines
      : split === "words"
        ? lines.join(" ").split(/\s+/)
        : lines.join(" ").split("");

  const parent = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child = {
    hidden: { y: "115%", rotate: split === "chars" ? 3 : 0 },
    visible: {
      y: "0%",
      rotate: 0,
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // motion.create replaces the deprecated motion() factory; memoized so a new
  // component type isn't created every render (which would remount the subtree)
  const MotionComp = useMemo(() => motion.create(Component as any), [Component]);

  return (
    <MotionComp
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12% 0px" }}
      variants={parent}
      aria-label={units.join(split === "chars" ? "" : " ")}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            "inline-block overflow-hidden align-bottom",
            split === "lines" && "block"
          )}
        >
          <motion.span variants={child} className="inline-block will-change-transform">
            {unit === " " ? " " : unit}
            {split === "words" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionComp>
  );
}
