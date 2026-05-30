import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/rooms/types/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

   const roomType = await prisma.roomType.findFirst({
    where: { OR: [{ slug: id }, { id }] },
    include: {
      heroImage: true,
      images: {
        orderBy: { order: "asc" },
        include: { asset: true },
      },
      tabs: {
        orderBy: { order: "asc" },
        include: {
          image: true,
          paragraphs: { orderBy: { order: "asc" } },
        },
      },
      rooms: { orderBy: { roomNumber: "asc" } },
    },
  })

  if (!roomType)
    return NextResponse.json({ error: "Room type not found" }, { status: 404 })

  return NextResponse.json(roomType)
}

// PUT /api/admin/rooms/types/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const {
    name, slug, label, description, tagline,
    basePrice, sizeSqm, maxGuests, beds,
    bathrooms, order, heroImageId,
  } = await req.json()

  const roomType = await prisma.roomType.update({
    where: { id },
    data: {
      name, slug, label, description, tagline,
      basePrice, sizeSqm, maxGuests, beds,
      bathrooms, order, heroImageId,
    },
    include: { heroImage: true },
  })

  return NextResponse.json(roomType)
}

// DELETE /api/admin/rooms/types/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  // Cascade deletes rooms, images, tabs, paragraphs via schema onDelete: Cascade
  await prisma.roomType.delete({ where: { id } })

  return NextResponse.json({ success: true })
}