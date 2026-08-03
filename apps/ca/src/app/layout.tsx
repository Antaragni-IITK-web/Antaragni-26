import type { Metadata, Viewport } from "next";
import { Inter, Libre_Bodoni } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { InitialState } from "@/components/shared/InitialState";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { Toaster } from "react-hot-toast";

// Libre Bodoni — sharp, high-contrast Didone with strong vertical stress.
// The site's primary editorial voice: headings, nav, buttons, cards, and stats.
const libreBodoni = Libre_Bodoni({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Inter — secondary sans, reserved for micro labels, form inputs, and helper text
// where a Didone would lose legibility.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://ca.antaragni.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Antaragni '26 | Campus Ambassador",
    template: "%s | Antaragni '26",
  },
  description:
    "Become the face of Antaragni — North India's largest cultural festival, IIT Kanpur. 60 years of legacy, 150K+ attendees, 400+ colleges. Lead your campus. Wear the flame.",
  keywords: [
    "Antaragni",
    "IIT Kanpur",
    "Campus Ambassador",
    "cultural festival",
    "college fest",
    "Antaragni 2026",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Antaragni '26 Campus Ambassador",
    title: "Antaragni '26 | Campus Ambassador",
    description:
      "The stage is bigger than you imagine. Represent India's cultural legacy — become an Antaragni Campus Ambassador.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antaragni '26 | Campus Ambassador",
    description:
      "The stage is bigger than you imagine. Represent India's cultural legacy — become an Antaragni Campus Ambassador.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${libreBodoni.variable} font-sans bg-background text-foreground antialiased`}>
        <InitialState document="CAs26" />
        <AmbientBackground />
        <SmoothScroll />
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
