import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientGlow from "@/components/AmbientGlow";

export const viewport: Viewport = {
  themeColor: "#161616",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Aman Maurya — CSE Student | Developer | Full-Stack & Systems",
  description:
    "Personal portfolio of Aman Maurya, B.Tech CSE student at PSIT Kanpur (2024–2028). Engineering high-performance full-stack web applications, algorithmic software, and modern systems.",
  keywords: [
    "Aman Maurya",
    "PSIT Kanpur",
    "B.Tech CSE",
    "Next.js 14",
    "TypeScript",
    "Python",
    "C++",
    "Data Structures and Algorithms",
    "Kanpur Developer",
    "Full-Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Aman Maurya", url: "https://github.com/amanmaurya18" }],
  creator: "Aman Maurya",
  openGraph: {
    title: "Aman Maurya — CSE Student | Developer | Full-Stack & Systems",
    description:
      "Engineering high-performance full-stack web applications, algorithmic software, and modern systems.",
    type: "website",
    locale: "en_US",
    siteName: "Aman Maurya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Maurya — CSE Student | Developer | Full-Stack & Systems",
    description:
      "Full-Stack Web Engineering, Systems, and Algorithmic Software by Aman Maurya.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans bg-[#161616] text-[#F2F1ED] antialiased min-h-screen selection:bg-[#710014]/60 selection:text-[#F2F1ED]">
        <AmbientGlow />
        <Navbar />
        <main className="relative w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
