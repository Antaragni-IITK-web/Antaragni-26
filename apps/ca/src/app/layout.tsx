import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { InitialState } from "@/components/shared/InitialState";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Toaster } from "react-hot-toast";

const helveticaNeue = localFont({
  src: [
    {
      path: "../../public/assets/fonts/helvetica-neue-5/HelveticaNeueRoman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/helvetica-neue-5/HelveticaNeueMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/helvetica-neue-5/HelveticaNeueBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const bodoniModa = localFont({
  src: "../../public/assets/fonts/Bodoni_Moda/BodoniModa-VariableFont_opsz,wght.woff2",
  variable: "--font-serif",
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
      <body className={`${helveticaNeue.variable} ${bodoniModa.variable} font-sans bg-background text-foreground antialiased`}>
        <InitialState document="CAs26" />
        <SmoothScroll />
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
