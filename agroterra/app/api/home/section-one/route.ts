import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/homepage/section-one
export async function GET() {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const sectionOne = await prisma.sectionOne.findFirst({
    include: {
      images: {
        orderBy: { order: "asc" },
        include: { asset: true },
      },
    },
  })

  // Seed a default row if none exists
  if (!sectionOne) {
    const created = await prisma.sectionOne.create({
      data: {
        label:   "Agroterra Resort",
        heading: "WELCOME TO AGROTERRA",
        quote:   "A place that celebrates life.",
      },
      include: {
        images: { orderBy: { order: "asc" }, include: { asset: true } },
      },
    })
    return NextResponse.json(created)
  }

  return NextResponse.json(sectionOne)
}

// PUT /api/admin/homepage/section-one
// Body: { id, label, heading, quote, images: [{ id?, order, assetId }] }
export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id, label, heading, quote, images } = await req.json()

  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 })

  const incoming    = images.filter((i: any) => !i.id.startsWith("new-"))
  const newImages   = images.filter((i: any) => i.id.startsWith("new-"))
  const incomingIds = incoming.map((i: any) => i.id)

  await prisma.$transaction([
    // Update section text
    prisma.sectionOne.update({
      where: { id },
      data:  { label, heading, quote },
    }),

    // Delete removed images
    prisma.sectionOneImage.deleteMany({
      where: {
        sectionId: id,
        id: { notIn: incomingIds },
      },
    }),

    // Update existing images
    ...incoming.map((img: any) =>
      prisma.sectionOneImage.update({
        where: { id: img.id },
        data:  { order: img.order, assetId: img.assetId },
      })
    ),

    // Create new images
    ...newImages.map((img: any) =>
      prisma.sectionOneImage.create({
        data: { order: img.order, assetId: img.assetId, sectionId: id },
      })
    ),
  ])

  const updated = await prisma.sectionOne.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" },
        include: { asset: true },
      },
    },
  })

  return NextResponse.json(updated)
}