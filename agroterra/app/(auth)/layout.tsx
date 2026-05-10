import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import Footer from "@/components/Footer";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosPhonePortrait, IoMdMailOpen } from "react-icons/io";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Agroterra Resort",
  description: "A luxury resort experience surrounded by nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen relative`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
