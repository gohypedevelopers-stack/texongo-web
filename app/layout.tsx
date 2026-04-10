import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/ui/navbar";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700", "900"],
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
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#F9FAFB] text-[#111111] antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        {children}
      </body>

    </html>
  );
}
