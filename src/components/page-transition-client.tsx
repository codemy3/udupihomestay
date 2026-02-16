"use client";
import dynamic from "next/dynamic";
import React from "react";
const PageTransition = dynamic(() => import("./page-transition-wipe"), { ssr: false });

export default function PageTransitionClient({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}