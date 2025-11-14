import type { Metadata } from "next";
import { IBM_Plex_Serif, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const plex = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Midnight Council of Steel",
  description:
    "An immersive cinematic tableau of medieval strategy brought to life with ultra-detailed textures and dynamic storytelling."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${plex.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
