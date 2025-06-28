import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import { getNavbarData } from "@/lib/getData";
import { getContent } from '@/lib/markdown';
import { Navbar } from "@/types/types";

export const metadata: Metadata = {
  title: "Portfolio Website",
  description: "Portfolio For Graphic Designer",
  icons: {
    icon: "/mhlogo.jpg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarData:Navbar[] = getNavbarData();
  const { logo } = getContent()
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Layout navbarData={navbarData} logo={logo}>{children}</Layout>
      </body>
    </html>
  );
}
