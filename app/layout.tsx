import type { Metadata } from "next";
import { Anton, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cannygpt.com"),
  title: "Bev — Why AI, pet?",
  description:
    "Chat with Bev — a warm Geordie matriarch from Newcastle who calls everyone pet and means it. Sound advice on anything: life, work, love, code, family.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bev — Why AI, pet?",
    description:
      "A warm Geordie matriarch giving canny advice on anything. Calls everyone pet.",
    images: ["/og.png"],
    type: "website",
    url: "https://cannygpt.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bev — Why AI, pet?",
    description:
      "A warm Geordie matriarch giving canny advice on anything. Calls everyone pet.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        {children}
        <Analytics />
        {plausibleDomain && (
          <Script
            defer
            strategy="afterInteractive"
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
