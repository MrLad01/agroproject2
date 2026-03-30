import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
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
        {/* ── Fix: Analytics must be inside <body> ── */}
        <Analytics />

        {/* ── TOP INFO BAR ── */}
        <div
          className="hidden sm:flex w-full items-center justify-between gap-4 flex-wrap px-6 md:px-10 lg:px-16"
          style={{
            backgroundColor: '#28683E',
            color: '#F8FAF6',
            paddingTop: '7px',
            paddingBottom: '7px',
          }}
        >
          {/* Location */}
          <Link
            className="flex gap-1.5 items-center hover:opacity-75 transition-opacity min-w-0"
            href="https://www.google.com/maps/place/Agroterra+Farm+Resort/@7.0972934,3.1209846,15z/data=!4m6!3m5!1s0x103a55f97786c3cb:0x5dca0bc8e4d4de1!8m2!3d7.0979033!4d3.1207854!16s%2Fg%2F11hjxgkkzr?entry=ttu&g_ep=EgoyMDI1MDYxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            style={{ color: '#F8FAF6' }}
          >
            <IoLocationSharp size={13} className="shrink-0 opacity-75" />
            <span className="hidden md:inline text-[11px] tracking-wide truncate opacity-85">
              Joga-Orile, Iboro/Joga 110123, Ogun State &nbsp;|&nbsp; 34XC+58 Alade, Nigeria
            </span>
            <span className="md:hidden text-[11px] tracking-wide truncate opacity-85">
              Joga-Orile, Ogun State
            </span>
          </Link>

          {/* Phone + Mail */}
          <div className="flex items-center gap-5 shrink-0">
            <Link
              href="tel:+2348033194444"
              className="flex gap-1.5 items-center hover:opacity-75 transition-opacity"
              style={{ color: '#F8FAF6' }}
            >
              <IoIosPhonePortrait size={13} className="shrink-0 opacity-75" />
              <span className="text-[11px] tracking-wide whitespace-nowrap opacity-85">
                (+234) 803 319 4444
              </span>
            </Link>

            <a
              href="mailto:info@agroterraresort.com"
              className="hidden lg:flex gap-1.5 items-center hover:opacity-75 transition-opacity"
              style={{ color: '#F8FAF6' }}
            >
              <IoMdMailOpen size={13} className="shrink-0 opacity-75" />
              <span className="text-[11px] tracking-wide opacity-85">
                info@agroterraresort.com
              </span>
            </a>

            {/* Thin separator */}
            <div
              className="hidden lg:block w-px h-3 opacity-30"
              style={{ backgroundColor: '#F8FAF6' }}
            />

            {/* Social pill links */}
            <div className="hidden lg:flex items-center gap-3">
              {[
                { label: 'Facebook', href: '/' },
                { label: 'Instagram', href: '/' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[10px] tracking-[0.12em] uppercase hover:opacity-75 transition-opacity opacity-70"
                  style={{ color: '#F8FAF6' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {children}
        <Footer />
      </body>
    </html>
  );
}