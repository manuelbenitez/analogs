import "~/styles/globals.css";

import { type Metadata } from "next";
import { Caveat } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Menu } from "./_components/Menu";

export const metadata: Metadata = {
  title: "Analogs — A Digital Scrapbook of Analog Pictures",
  description:
    "Over a decade of film photography spanning New Zealand, Japan, Austria, Spain, Indonesia, Argentina, and more.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Analogs — A Digital Scrapbook of Analog Pictures",
    description:
      "Over a decade of film photography spanning New Zealand, Japan, Austria, Spain, Indonesia, Argentina, and more.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analogs — A Digital Scrapbook of Analog Pictures",
    description:
      "Over a decade of film photography spanning New Zealand, Japan, Austria, Spain, Indonesia, Argentina, and more.",
    images: ["/opengraph-image"],
  },
};

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} font-caveat flex min-h-screen min-w-screen flex-col items-center justify-center bg-black text-white`}
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
        <TRPCReactProvider>
          <Menu />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
