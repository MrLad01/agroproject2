import { redirect } from 'next/navigation'
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "../globals.css"
import { Analytics } from "@vercel/analytics/next"
import { auth } from "@/auth"
import AdminSidebar from '@/components/AdminSidebar'

export const metadata: Metadata = {
  title: "Agroterra Resort",
  description: "A luxury resort experience surrounded by nature.",
}

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()

  if (!session || !session.user.isAdmin) {
    redirect("/login")
  }

  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen bg-stone-100 dark:bg-stone-900`}>
        <Analytics />
        <AdminSidebar />
        <main className="pl-56 min-h-screen transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  )
}