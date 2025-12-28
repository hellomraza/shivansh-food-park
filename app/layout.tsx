import type { Metadata, Viewport } from "next";
import { Providers } from "../components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivansh Food Park - Premium Dining Experience",
  description: "Experience exceptional cuisine and hospitality at Shivansh Food Park. Premium restaurant serving authentic food with outstanding ambiance in Dhamtari.",
  keywords: "restaurant, dining, food, Dhamtari, premium, cuisine",
  openGraph: {
    title: "Shivansh Food Park",
    description: "Premium dining experience in Dhamtari",
    type: "website",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
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
        {/* Optimize critical request chains */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
        
        {/* Preconnect to critical Google APIs - reduces DNS lookup + TCP handshake */}
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for optional resources to reduce lookup time */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Critical CSS for above-the-fold content - reduces First Paint */}
        <style>{`
          html { scroll-behavior: smooth; }
          body { background-color: #0a0a0a; color: #ededed; }
          section { overflow: hidden; }
        `}</style>
        
        {/* Defer non-critical resources parsing */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className="bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
