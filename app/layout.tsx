import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ananta Technologies — AI for Glass Contractors",
  description:
    "The only AI platform built for the U.S. glass and glazing industry. AI takeoff, shop drawings, engineering stamps, and submittal packages — done for you.",
  openGraph: {
    title: "Ananta Technologies — AI for Glass Contractors",
    description: "The only AI platform built for the U.S. glass and glazing industry.",
    type: "website",
    url: "https://ananta.ai",
    siteName: "Ananta Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananta Technologies — AI for Glass Contractors",
    description: "The only AI platform built for the U.S. glass and glazing industry.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
