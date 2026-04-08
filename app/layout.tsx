import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/Bahnschrift.ttf",
  variable: "--font-sans",
  display: "swap",
});

const display = localFont({
  src: "./fonts/Bahnschrift.ttf",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Texongo Fabrics",
  description: "Texongo fabric and clothing storefront for modern collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-[#f6f1e7] text-[#111111] antialiased">
        {children}
      </body>
    </html>
  );
}
