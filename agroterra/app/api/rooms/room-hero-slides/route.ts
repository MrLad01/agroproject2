import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/rooms/slides
export async function GET() {
  // const session = await auth()
  // if (!session?.user.isAdmin)
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const slides = await prisma.roomSlide.findMany({
    orderBy: { order: "asc" },
    include: { asset: true },
  })

  return NextResponse.json(slides)
}

// PUT /api/admin/rooms/slides
// Body: [{ id, order, active, assetId }]
// New slides have ids starting with "new-"
export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body: { id: string; order: number; active: boolean; assetId: string }[] =
    await req.json()

  if (!Array.isArray(body))
    return NextResponse.json({ error: "Expected an array" }, { status: 400 })

  const existing    = body.filter(s => !s.id.startsWith("new-"))
  const newSlides   = body.filter(s => s.id.startsWith("new-"))
  const existingIds = existing.map(s => s.id)

  await prisma.$transaction([
    prisma.roomSlide.deleteMany({
      where: { id: { notIn: existingIds } },
    }),
    ...existing.map(s =>
      prisma.roomSlide.update({
        where: { id: s.id },
        data:  { order: s.order, active: s.active, assetId: s.assetId },
      })
    ),
    ...newSlides.map(s =>
      prisma.roomSlide.create({
        data: { order: s.order, active: s.active, assetId: s.assetId },
      })
    ),
  ])

  const updated = await prisma.roomSlide.findMany({
    orderBy: { order: "asc" },
    include: { asset: true },
  })

  return NextResponse.json(updated)
}