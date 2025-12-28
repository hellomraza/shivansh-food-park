import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
