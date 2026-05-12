'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { href: '/admin/rooms', label: 'Rooms', icon: '🛏' },
  { href: '/admin/guests', label: 'Guests', icon: '👤' },
  { href: '/admin/reports', label: 'Reports', icon: '📊' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen z-40 flex flex-col
        bg-stone-950 border-r border-stone-800
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-56'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-stone-800">
        {!collapsed && (
          <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase">
            Agroterra
          </span>
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

      {/* User */}
      {!collapsed && (
        <div className="border-t border-stone-800 px-4 py-4">
          <p className="text-xs text-stone-500">Signed in as</p>
          <p className="text-sm text-stone-300 font-medium truncate mt-0.5">Admin</p>
        </div>
      )}
    </aside>
  )
}