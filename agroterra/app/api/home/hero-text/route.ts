import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/homepage/hero-text
export async function GET() {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Always upsert a default row so it's never null
  const heroText = await prisma.heroText.upsert({
    where:  { id: "main" },
    update: {},
    create: {
      id:      "main",
      heading: "WELCOME TO AGROTERRA",
      subtext: "A place that celebrates life.",
    },
  })

  return NextResponse.json(heroText)
}

// PUT /api/admin/homepage/hero-text
export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { heading, subtext } = await req.json()

  if (!heading || !subtext)
    return NextResponse.json({ error: "heading and subtext are required" }, { status: 400 })

  const heroText = await prisma.heroText.upsert({
    where:  { id: "main" },
    update: { heading, subtext },
    create: { id: "main", heading, subtext },
  })

  return NextResponse.json(heroText)
}