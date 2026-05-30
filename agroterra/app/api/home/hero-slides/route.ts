import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/homepage/hero-slides
export async function GET() {
  // const session = await auth()
  // if (!session?.user.isAdmin)
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
    include: { asset: true },
  })

  return NextResponse.json(slides)
}

// PUT /api/admin/homepage/hero-slides
// Body: Array of { id?, order, active, assetId }
// New slides have ids starting with "new-" — we create those
// Existing slides are updated, missing ones are deleted
export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body: { id: string; order: number; active: boolean; assetId: string }[] =
    await req.json()

  if (!Array.isArray(body))
    return NextResponse.json({ error: "Expected an array" }, { status: 400 })

  const incoming     = body.filter(s => !s.id.startsWith("new-"))
  const newSlides    = body.filter(s => s.id.startsWith("new-"))
  const incomingIds  = incoming.map(s => s.id)

  await prisma.$transaction([
    // Delete removed slides
    prisma.heroSlide.deleteMany({
      where: { id: { notIn: incomingIds } },
    }),

    // Update existing
    ...incoming.map(s =>
      prisma.heroSlide.update({
        where: { id: s.id },
        data:  { order: s.order, active: s.active, assetId: s.assetId },
      })
    ),

    // Create new
    ...newSlides.map(s =>
      prisma.heroSlide.create({
        data: { order: s.order, active: s.active, assetId: s.assetId },
      })
    ),
  ])

  const updated = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
    include: { asset: true },
  })

  return NextResponse.json(updated)
}