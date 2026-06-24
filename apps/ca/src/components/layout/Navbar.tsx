"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NavigationLink } from "../ui/NavigationLink";
import { useStore } from "@repo/store";
import { firebaseGetUser, firebaseGoogleSignIn, firebaseLogout } from "@repo/firebase";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Benefits", href: "#incentives" },
  { label: "Roles", href: "#roles" },
  { label: "FAQ", href: "#faq" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, setLoading } = useStore();

  const handleLogin = async () => {
    if (!user) {
      const result = await firebaseGoogleSignIn();
      if (result) {
        await firebaseGetUser("CAs26", setUser, setLoading);
      }
    } else {
      await firebaseLogout(setUser);
    }
  };

  useEffect(() => {
    if (user && !user.details) {
      router.push("/register");
    }
  }, [user, router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const targetId = href.replace(/.*#/, "");
      const elem = document.getElementById(targetId);
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Main Nav Bar ─────────────────────────────────────────────── */}
      <motion.nav
        className="w-full z-50 sticky top-0"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Scroll-aware frosted glass bar */}
        <div
          className="w-full transition-all duration-500"
          style={{
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
            background: scrolled
              ? "rgba(5, 5, 5, 0.82)"
              : "transparent",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
            boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 h-[72px] flex items-center justify-between">

            {/* Logo */}
            <a
              href={pathname === "/" ? "#home" : "/"}
              onClick={(e) => handleScroll(e, "#home")}
              className="block relative w-9 h-11 cursor-pointer group"
            >
              <Image
                src="/assets/logo.webp"
                alt="Antaragni Logo"
                fill
                className="object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(217,35,35,0.8)]"
                priority
              />
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-7 lg:gap-10">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavigationLink
                    href={pathname === "/" ? link.href : `/${link.href}`}
                    onClick={(e) => handleScroll(e, link.href)}
                  >
                    {link.label}
                  </NavigationLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {(!user) ? (
                  <button
                    onClick={handleLogin}
                    className="relative overflow-hidden bg-accent text-white px-6 py-2.5 rounded-full font-sans font-medium text-[12px] uppercase tracking-[0.08em] hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_18px_rgba(217,35,35,0.25)] hover:shadow-[0_0_30px_rgba(217,35,35,0.5)] group"
                  >
                    <span className="relative z-10">SIGN UP / JOIN US</span>
                  </button>
                ) : pathname === "/dashboard" || pathname === "/register" ? (
                  <button
                    onClick={handleLogin}
                    className="relative overflow-hidden bg-accent text-white px-6 py-2.5 rounded-full font-sans font-medium text-[12px] uppercase tracking-[0.08em] hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_18px_rgba(217,35,35,0.25)] hover:shadow-[0_0_30px_rgba(217,35,35,0.5)] group"
                  >
                    <span className="relative z-10">Log Out</span>
                  </button>
                ) : (
                  <Link
                    href="/dashboard"
                    className="relative overflow-hidden bg-accent text-white px-6 py-2.5 rounded-full font-sans font-medium text-[12px] uppercase tracking-[0.08em] hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_18px_rgba(217,35,35,0.25)] hover:shadow-[0_0_30px_rgba(217,35,35,0.5)] group"
                  >
                    <span className="relative z-10">Dashboard</span>
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-foreground p-2 transition-colors duration-200 hover:text-accent"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12H21M3 6H21M3 18H21" />
                )}
              </svg>
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="absolute top-[72px] left-0 right-0 bg-[#080808] border-b border-white/10 px-8 py-10 flex flex-col gap-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={pathname === "/" ? link.href : `/${link.href}`}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-white/70 hover:text-white text-[13px] font-sans font-medium uppercase tracking-[0.2em] transition-colors duration-200 border-b border-white/5 pb-8 last:border-0 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-accent/60 text-[10px] mr-3">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {(!user) ? (
                  <button
                    onClick={() => {
                      handleLogin();
                      setMobileOpen(false);
                    }}
                    className="mt-4 w-full flex items-center justify-center bg-accent hover:bg-red-600 text-white py-3 rounded-full font-sans font-medium text-[12px] uppercase tracking-[0.12em] transition-colors duration-300"
                  >
                    SIGN UP / JOIN US
                  </button>
                ) : pathname === "/dashboard" || pathname === "/register" ? (
                  <button
                    onClick={() => {
                      handleLogin();
                      setMobileOpen(false);
                    }}
                    className="mt-4 w-full flex items-center justify-center bg-accent hover:bg-red-600 text-white py-3 rounded-full font-sans font-medium text-[12px] uppercase tracking-[0.12em] transition-colors duration-300"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    href="/dashboard"
                    className="mt-4 w-full flex items-center justify-center bg-accent hover:bg-red-600 text-white py-3 rounded-full font-sans font-medium text-[12px] uppercase tracking-[0.12em] transition-colors duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
