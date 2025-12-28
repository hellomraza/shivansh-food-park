import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Shivansh Food Park - Premium Dining Experience",
  description: "Experience exceptional cuisine and hospitality at Shivansh Food Park. Premium restaurant serving authentic food with outstanding ambiance in Dhamtari.",
  keywords: "restaurant, dining, food, Dhamtari, premium, cuisine",
  openGraph: {
    title: "Shivansh Food Park",
    description: "Premium dining experience in Dhamtari",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts to avoid layout shift */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
