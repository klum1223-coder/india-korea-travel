import type { Metadata } from "next";
import { Poppins, Inter, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Discover Korea - Educational Travel for Indian Students",
    template: "%s | Discover Korea",
  },
  description:
    "Structured educational travel programs in South Korea for Indian students. University visits, STEM industry tours, K-culture experiences, DMZ peace education. Packages from $1,150.",
  keywords: [
    "Korea educational trip",
    "Korea school trip India",
    "Korea student tour",
    "DMZ educational tour",
    "KAIST university visit",
    "Korea travel Indian students",
    "Seoul Busan tour",
    "Korea STEM tour",
  ],
  authors: [{ name: "Discover Korea Educational Travel" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Discover Korea",
    title: "Discover Korea - Educational Travel for Indian Students",
    description:
      "Structured educational travel programs in South Korea. University visits, industry tours, K-culture experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Korea - Educational Travel for Indian Students",
    description:
      "Structured educational travel programs in South Korea for Indian students.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen bg-background text-text-primary font-inter antialiased">
        <Header />
        <main className="pt-[calc(2.5rem+4rem)] lg:pt-[calc(2rem+4rem)]">
          {children}
        </main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
