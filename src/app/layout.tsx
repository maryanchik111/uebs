import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/client/header";
import Footer from "./components/client/footer";
import { LanguageProvider } from "@/contexts/language-context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UEBSchool м. Рівне — Біблійна школа | Духовна освіта та християнське лідерство",
  description: "Повна біблійна програма у м. Рівне. 50 зустрічей духовного навчання, формування християнського характеру та підготовка до служіння. Безкоштовне навчання, вечірній формат, 2 рази на місяць.",
  keywords: ["біблійна школа", "Рівне", "християнська освіта", "духовне навчання", "служіння", "Біблія", "UEBSchool"],
  authors: [{ name: "UEBSchool" }],
  creator: "UEBSchool",
  publisher: "UEBSchool",
  openGraph: {
    title: "UEBSchool м. Рівне — Біблійна школа",
    description: "Повна біблійна програма у м. Рівне. Вивчайте Писання, розвивайте служіння та зростайте у вірі разом з нами.",
    url: "https://uebschool.com",
    siteName: "UEBSchool",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UEBSchool м. Рівне — Біблійна школа",
    description: "Повна біблійна програма у м. Рівне. Вивчайте Писання, розвивайте служіння та зростайте у вірі разом з нами.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
