import type { Metadata } from "next";
import { Unbounded, Manrope, Questrial } from "next/font/google";
import "./globals.css";

/* Display / hero headings — bold geometric like "mg" on jasminegunarto.com */
const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

/* Navigation, labels, tags — same as Jasmine */
const manrope = Manrope({
  variable: "--font-nav",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

/* Body / paragraphs — Questrial, sans legible y moderno */
const questrial = Questrial({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tamara Pilgram — Profesora de Inglés Online",
  description:
    "13 años formando alumnos. Clases de inglés online 100% personalizadas, para todos los niveles. Primera clase sin cargo.",
  openGraph: {
    title: "Tamara Pilgram — Profesora de Inglés Online",
    description: "Primera clase gratuita · 13 años de experiencia · Todos los niveles",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${unbounded.variable} ${manrope.variable} ${questrial.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
