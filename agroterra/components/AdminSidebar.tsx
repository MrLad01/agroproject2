'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '@/app/favicon.ico'
import { CiGrid31 } from "react-icons/ci";
import { RiDoorOpenLine, RiHomeGearLine } from "react-icons/ri";
import { LiaGlassCheersSolid } from "react-icons/lia";
import { TbLogs } from 'react-icons/tb'
import { MdOutlineBedroomParent, MdOutlinePermMedia } from 'react-icons/md'
import { GiGolfFlag } from "react-icons/gi";
import { FaInfo } from 'react-icons/fa'
import { signOut} from "next-auth/react"
import { useSession } from "next-auth/react"

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <CiGrid31 size={22} /> },
  { href: '/edit-home', label: 'Home', icon: <RiHomeGearLine size={22} /> },
  { href: '/edit-blogs', label: 'Blogs', icon: <TbLogs size={22} />},
  { href: '/edit-dining', label: 'Dining', icon: <LiaGlassCheersSolid size={22} /> },
  { href: '/edit-rooms', label: 'Reservations', icon: <MdOutlineBedroomParent size={22} /> },
  { href: '/edit-golf', label: 'Golf', icon: <GiGolfFlag size={22} /> },
  { href: '/edit-about', label: 'About', icon: <FaInfo size={22} /> },
  { href: '/edit-media', label: 'Media', icon: <MdOutlinePermMedia size={22} /> },

]
const heroOverlay = {
  light: 'rgba(0,0,0,0.45)',
  dark:  'rgba(8,14,8,0.72)',
}

const toggleStyle = {
  light: { bg: '#ede8df', border: '#ddd5c4', accent: '#3a5c3a' },
  dark:  { bg: '#0f180f', border: '#243424', accent: '#7ec850' },
}

async function handleSignout() {
  await signOut({ redirectTo: "/login" })
}

export function getFirstName(name: string | null | undefined) {
  return name?.split(" ")[0] ?? "User"
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  const { name, email, isAdmin } = session!.user


  // Respect OS preference on first load
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
  }, [])

const tg = isDark ? toggleStyle.dark : toggleStyle.light
  const overlay = isDark ? heroOverlay.dark : heroOverlay.light

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen z-40 flex flex-col
        bg-stone-950 border-stone-800
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-56'}
        ${tg.accent} ${tg.bg} 
      `}
      style={{
        backgroundColor: isDark ? '#080e08' : '#f8f5ef',
        transition: 'background-color 0.3s',
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-stone-800">
        {!collapsed && (
          <div className='flex items-end justify-end gap-2'>
            <Image src={logo} alt='Agroterra Resort Logo' height={25} />
            <span className=" font-semibold eb-garamond-semibold text-sm tracking-widest uppercase">
              Agroterra
            </span>
          </div>

        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-stone-400 hover:text-stone-100 transition-colors ml-auto"
          aria-label="Toggle sidebar"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md text-sm
                transition-colors duration-150
                ${active
                  ? 'bg-amber-500/15 text-amber-400'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-100'
                }
              `}
            >
              <span className="text-base shrink-0">{icon}</span>
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          )
        })}
      </nav>

      
      <button
          onClick={handleSignout}
        className={`
          flex items-center gap-3 px-3 py-1.5 mb-3 rounded-md text-sm
          transition-colors duration-150
          text-stone-400 hover:bg-stone-800 hover:text-stone-100
          }
        `}
      >
        <span className="text-base shrink-0"><RiDoorOpenLine size={22} /></span>
        {!collapsed && <span className="truncate">Sign Out</span>}
      </button>
      
      {/* User */}
      {!collapsed && (
        <div className="border-t border-stone-800 px-4 py-4">
          <p className="text-xs text-stone-500">Signed in as</p>
          <p className="text-sm text-stone-300 font-medium truncate mt-0.5">{name}</p>
        </div>
      )}
    </aside>
  )
}