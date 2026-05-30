import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// PUT /api/admin/rooms/[roomId]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { roomId } = await params
  const { roomNumber, floor, view, isActive, notes } = await req.json()

  const room = await prisma.room.update({
    where: { id: roomId },
    data:  { roomNumber, floor, view, isActive, notes },
  })

  return NextResponse.json(room)
}

// DELETE /api/admin/rooms/[roomId]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { roomId } = await params

  await prisma.room.delete({ where: { id: roomId } })

  return NextResponse.json({ success: true })
}