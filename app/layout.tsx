import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const figtree = localFont({
  src: "./fonts/FigtreeVF.ttf",
  variable: "--font-figtree",
  weight: "300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "JFC Contact & Tasks",
  description:
    "A simple contact and task management app built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased`}>{children}</body>
      <Toaster position="top-right" richColors />
    </html>
  );
}
