import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/rooms/types
export async function GET() {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const roomTypes = await prisma.roomType.findMany({
    orderBy: { order: "asc" },
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

  return NextResponse.json(roomTypes)
}

// POST /api/admin/rooms/types
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const {
    name, slug, label, description, tagline,
    basePrice, sizeSqm, maxGuests, beds,
    bathrooms, order, heroImageId,
  } = await req.json()

  if (!name || !slug || !beds || basePrice === undefined)
    return NextResponse.json(
      { error: "name, slug, beds and basePrice are required" },
      { status: 400 }
    )

  const roomType = await prisma.roomType.create({
    data: {
      name, slug, label, description, tagline,
      basePrice, sizeSqm, maxGuests, beds,
      bathrooms, order, heroImageId,
    },
    include: { heroImage: true },
  })

  return NextResponse.json(roomType, { status: 201 })
}