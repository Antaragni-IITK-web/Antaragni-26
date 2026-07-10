"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  className?: string;
}

/** Eased number counter that runs once when scrolled into view. */
export function CountUp({
  value,
  duration = 1.8,
  delay = 0,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t + delay * 1000;
      const elapsed = Math.max(0, t - start);
      const p = Math.min(1, elapsed / (duration * 1000));
      // easeOutExpo — fast start, cinematic settle
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
