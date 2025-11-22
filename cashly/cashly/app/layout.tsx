import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNavbar } from "@/components/ui/bottom-navbar";
import TopLogo from "@/components/ui/top-logo";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cashly.app'),
  title: {
    default: "Cashly - Smart Expense Tracking with AI",
    template: "%s | Cashly"
  },
  description: "Track your expenses effortlessly with AI-powered receipt scanning. Analyze spending patterns, categorize transactions, and gain insights into your financial habits.",
  keywords: ["expense tracker", "receipt scanner", "AI expense tracking", "spending analysis", "budget management", "financial tracking", "receipt management"],
  authors: [{ name: "Cashly" }],
  creator: "Cashly",
  publisher: "Cashly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cashly.app",
    title: "Cashly - Smart Expense Tracking with AI",
    description: "Track your expenses effortlessly with AI-powered receipt scanning. Analyze spending patterns and gain financial insights.",
    siteName: "Cashly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cashly - Smart Expense Tracking with AI",
    description: "Track your expenses effortlessly with AI-powered receipt scanning. Analyze spending patterns and gain financial insights.",
    creator: "@cashly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${geistMono.variable} antialiased`}>
        <TopLogo />
        <div className="max-w-4xl mx-auto pt-20 pb-30"> {children}</div>
        <BottomNavbar />
        <Toaster />
      </body>
    </html>
  );
}
