import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* ============================================================
   FONTS
   ============================================================ */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

/* ============================================================
   METADATA
   ============================================================ */
export const metadata: Metadata = {
  title: {
    default: "Ìrántí Registry",
    template: "%s · Ìrántí Registry",
  },
  description:
    "Nigeria's first community-verified digital burial and memorial registry. Search records, submit memorials, and preserve remembrance.",
  metadataBase: new URL("https://irantiregistry.ng"), // update when you have a domain
  openGraph: {
    title: "Ìrántí Registry",
    description:
      "Nigeria's first community-verified digital burial and memorial registry.",
    url: "https://irantiregistry.ng",
    siteName: "Ìrántí Registry",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ìrántí Registry — Nigeria's community-verified burial records",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ìrántí Registry",
    description: "Nigeria's first community-verified digital burial and memorial registry.",
    images: ["/og-image.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  themeColor: "#1E2A44",
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}