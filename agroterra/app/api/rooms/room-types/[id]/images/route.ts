import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// PUT /api/admin/rooms/types/[id]/images
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id: roomTypeId } = await params
  const body: { id: string; order: number; assetId: string }[] = await req.json()

  if (!Array.isArray(body))
    return NextResponse.json({ error: "Expected an array" }, { status: 400 })

  const existing  = body.filter(i => !i.id.startsWith("new-"))
  const newImages = body.filter(i => i.id.startsWith("new-"))

  // Keep only IDs that are real DB records (non "new-" prefixed)
  const existingIds = existing.map(i => i.id)

  await prisma.$transaction([
    // Delete any images for this room type not present in the submitted list
    prisma.roomImage.deleteMany({
      where: {
        roomTypeId,
        // Also exclude assets that are being added as "new" — they may already exist
        assetId: { notIn: newImages.map(i => i.assetId) },
        id: { notIn: existingIds },
      },
    }),
    // Update order on existing records
    ...existing.map(i =>
      prisma.roomImage.update({
        where: { id: i.id },
        data:  { order: i.order },
      })
    ),
    // Upsert new images — safe even if the (roomTypeId, assetId) pair already exists
    ...newImages.map(i =>
      prisma.roomImage.upsert({
        where:  { roomTypeId_assetId: { roomTypeId, assetId: i.assetId } },
        update: { order: i.order },
        create: { roomTypeId, order: i.order, assetId: i.assetId },
      })
    ),
  ])

  const updated = await prisma.roomImage.findMany({
    where:   { roomTypeId },
    orderBy: { order: "asc" },
    include: { asset: true },
  })

  return NextResponse.json(updated)
}