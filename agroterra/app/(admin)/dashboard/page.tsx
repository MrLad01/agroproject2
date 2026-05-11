"use client" 

import React from 'react'
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  async function handleSignout() {
    await signOut({ redirectTo: "/login" })
  }

  return (
    <div>Dashboard
      <button onClick={handleSignout} className='border cursor-pointer'>Sign Out</button>
    </div>
  )
}