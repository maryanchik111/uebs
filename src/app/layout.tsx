import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/client/header";
import Footer from "./components/client/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Встанови NEXT_PUBLIC_SITE_URL в .env або залиш за замовчуванням
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uebs.com.ua";
const SITE_NAME = "UEBSchool м. Рівне — Біблійна школа";
const SITE_DESC =
  "Повна біблійна програма у м. Рівне. Вивчайте Писання, розвивайте служіння та зростайте у вірі разом з нами.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | UEBSchool",
  },
  description: SITE_DESC,
  keywords: [
    "Біблійна школа",
    "Рівне",
    "UEBSchool",
    "християнське навчання",
    "служіння",
    "Біблія",
  ],
  authors: [{ name: "UEBSchool", url: SITE_URL }],
  creator: "UEBSchool",
  publisher: "UEBSchool",
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
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
    images: [`${SITE_URL}/og-image.png`],
    creator: "@uebschool",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#061425" },
  ],
  verification: {
    // При необхідності додай ключі в .env: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION тощо
    // google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      {/* зробити body flex-контейнер колонкою і мінімальною висотою екрану */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        {/* контейнер для контенту займає доступний простір */}
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
