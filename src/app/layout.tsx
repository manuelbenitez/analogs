import "~/styles/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { type Metadata } from "next";
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";

import { Menu } from "./_components/Menu";
import { LangProvider } from "./_contexts/LangContext";
import { LangToggle } from "./_components/LangToggle";
import { ImageCacheProvider } from "./_contexts/ImageCacheContext";

export const metadata: Metadata = {
  title: "A Digital Scrapbook",
  description:
    "Over a decade of film photography spanning New Zealand, Japan, Austria, Spain, Indonesia, Argentina, and more.",
  icons: [{ rel: "icon", url: "/icon.svg", type: "image/svg+xml" }],
  openGraph: {
    title: "A Digital Scrapbook",
    description:
      "Over a decade of film photography spanning New Zealand, Japan, Austria, Spain, Indonesia, Argentina, and more.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Digital Scrapbook",
    description:
      "Over a decade of film photography spanning New Zealand, Japan, Austria, Spain, Indonesia, Argentina, and more.",
    images: ["/opengraph-image"],
  },
};

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID ?? "G-HZEDNVLRN6";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${plusJakartaSans.variable} font-plus-jakarta-sans flex min-h-screen min-w-screen flex-col items-center justify-center bg-black text-white`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflow: "auto",
      }}
    >
      <body
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <GoogleAnalytics gaId={googleAnalyticsId} />
        <LangProvider>
          <ImageCacheProvider>
            <Menu />
            <LangToggle />
            {children}
          </ImageCacheProvider>
        </LangProvider>
      </body>
    </html>
  );
}
