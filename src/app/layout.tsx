import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/client/header";
import Footer from "./components/client/footer";
import MobileNav from "./components/client/mobile-nav";
import PWAInstallPrompt from "./components/client/pwa-install-prompt";
import { LanguageProvider } from "@/contexts/language-context";
import { AuthProvider } from "@/contexts/auth-context";
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
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'UEBSchool',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <LanguageProvider>
            <Header />
            {children}
            <Footer />
            <MobileNav />
            <PWAInstallPrompt />
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
