import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import dynamic from "next/dynamic";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CustomCursor from "@/components/custom-cursor";

// Dynamically import the page transition to avoid SSR/CSR mismatch
import PageTransitionClient from "@/components/page-transition-client";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Udupi Homestays",
  description:
    "A modern coastal homestay experience inspired by Udupi's heritage, cuisine, and shoreline calm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <CustomCursor />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            {/* Yellow wipe page transition */}
            <PageTransitionClient>{children}</PageTransitionClient>
          </main>
          {/* ...existing code... */}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
