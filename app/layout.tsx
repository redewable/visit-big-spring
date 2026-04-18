import type { Metadata } from "next";
import { Inter, Fraunces, Rye } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "900"],
});
// Rye — a 19th-century Western slab face. Used only for small accent marks
// (eyebrows, numerals, storyboards) so it never feels costume-y.
const slab = Rye({
  subsets: ["latin"],
  variable: "--font-slab",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Visit Big Spring | West Texas destination, heritage & events",
    template: "%s | Visit Big Spring",
  },
  description:
    "Plan your trip to Big Spring, Texas. Scenic state park, heritage museums, historic downtown, and a calendar of West Texas festivals, rodeos and holiday lights.",
  openGraph: {
    type: "website",
    title: "Visit Big Spring",
    description: "West Texas heritage, outdoor recreation, and year-round events.",
    siteName: "Visit Big Spring",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${slab.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
