import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CustomCursor from "@/components/custom-cursor";
import PageTransitionClient from "@/components/page-transition-client";

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
        className={`${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <CustomCursor />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <PageTransitionClient>{children}</PageTransitionClient>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}