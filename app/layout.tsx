import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";

export const metadata: Metadata = {
  title: "BYEOL - Global Starbucks Rankings",
  description:
    "BYEOL is a website that provides real-time global music rankings. Discover the latest global music trends and popular tracks at a glance.",
  keywords: [
    "BYEOL",
    "Global Starbucks Rankings",
    "Starbucks Charts",
    "Popular Starbucks",
    "Latest Starbucks Trends",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
