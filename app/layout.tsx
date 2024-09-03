import HeaderAuth from "@/components/header-auth";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import React from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  auth,
  children,
}: {
  auth: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full flex justify-end items-center p-3 px-5 text-sm">
                    <HeaderAuth />
                </div>

              </nav>
              <div className="flex flex-col gap-20 p-5 w-full">
                {children}
                {auth}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8">
              </footer>
            </div>
          </main>
      </body>
    </html>
  );
}
