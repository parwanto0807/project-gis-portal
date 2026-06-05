import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";

// Configure Inter - Perfect for ERP/Dashboard
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "GIS Portal - ERP System",
  description: "Grafindo Information System - Enterprise Resource Planning",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-md.png",
    shortcut: "/logo-md.png",
    apple: "/logo-md.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GIS Portal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${GeistMono.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
