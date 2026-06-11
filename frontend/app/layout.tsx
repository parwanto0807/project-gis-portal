import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
import InstallPWA from "@/components/pwa/InstallPWA";

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
  metadataBase: new URL("https://grafindo-app.com"),
  title: "GIS Portal - ERP System",
  description: "Grafindo Information System - Pusat kendali operasional ERP dan Temuan Peduli Bersinergi PT Grafindo Mitrasemesta.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-sm.png",
    shortcut: "/logo-sm.png",
    apple: "/logo-sm.png",
  },
  openGraph: {
    type: "website",
    url: "https://grafindo-app.com",
    title: "GIS Portal - ERP System",
    description: "Pusat kendali operasional ERP dan Temuan Peduli Bersinergi PT Grafindo Mitrasemesta.",
    siteName: "GIS Portal",
    images: [
      {
        url: "/logo-md.png",
        width: 800,
        height: 600,
        alt: "GIS Portal Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GIS Portal - ERP System",
    description: "Pusat kendali operasional ERP dan Temuan Peduli Bersinergi PT Grafindo Mitrasemesta.",
    images: ["/logo-md.png"],
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                window.deferredPrompt = e;
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${GeistMono.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <InstallPWA />
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
