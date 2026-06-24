import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { InitialState } from "@/components/shared/InitialState";
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

export const metadata: Metadata = {
  title: "Antaragni Campus Ambassador Program",
  description: "Lead the Legacy. Represent the Spirit of Antaragni.",
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
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
