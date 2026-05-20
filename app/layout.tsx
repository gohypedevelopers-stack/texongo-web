import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { CartDrawer } from "@/components/ui/cart-drawer";
import { Preloader } from "../components/ui/preloader";
import { SmoothScroll } from "../components/ui/smooth-scroll";


const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700", "900"],
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
    <html lang="en" className={`${roboto.variable}`} suppressHydrationWarning>
      <body
        className={`${roboto.className} min-h-screen bg-[#F9FAFB] text-[#111111] antialiased`}
        suppressHydrationWarning
      >
        <SmoothScroll />
        <Preloader />
        <Navbar />
        <CartDrawer />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
      </body>

    </html>
  );
}
