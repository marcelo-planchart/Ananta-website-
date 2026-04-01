import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ananta Technologies — AI for Glass Contractors",
  description:
    "The only AI platform built for the U.S. glass and glazing industry. AI takeoff, shop drawings, engineering stamps, and submittal packages — done for you.",
  keywords: [
    "glass takeoff software",
    "glazing AI",
    "shop drawings",
    "engineering stamps",
    "glass contractor software",
    "California glazing",
    "Elite Drafting",
  ],
  openGraph: {
    title: "Ananta Technologies — AI for Glass Contractors",
    description:
      "The only AI platform built for the U.S. glass and glazing industry.",
    type: "website",
    url: "https://ananta.ai",
    siteName: "Ananta Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananta Technologies — AI for Glass Contractors",
    description:
      "The only AI platform built for the U.S. glass and glazing industry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy text-white-off antialiased">
        {children}
      </body>
    </html>
  );
}
