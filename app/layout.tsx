import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SaaSelerator",
  description: "Transform your SaaS idea into an actionable plan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased gradient-mesh`}
      >
        <div className="grain-overlay" />
        {children}
        <div className="container text-center text-muted-foreground text-sm mx-auto py-4">
          <p>© 2026 SaaSselerator. All rights reserved.</p>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
