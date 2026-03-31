import "~/styles/globals.css";

import Script from "next/script";
import { type Metadata } from "next";
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";

import { Menu } from "./_components/Menu";
import { LangProvider } from "./_contexts/LangContext";
import { LangToggle } from "./_components/LangToggle";

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HZEDNVLRN6"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HZEDNVLRN6');
          `}
        </Script>
        <LangProvider>
          <Menu />
          <LangToggle />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
