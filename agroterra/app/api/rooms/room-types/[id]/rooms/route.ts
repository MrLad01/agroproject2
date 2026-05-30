import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/rooms/types/[id]/rooms
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const rooms = await prisma.room.findMany({
    where:   { roomTypeId: id },
    orderBy: { roomNumber: "asc" },
  })

  return NextResponse.json(rooms)
}

// POST /api/admin/rooms/types/[id]/rooms
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id: roomTypeId } = await params
  const { roomNumber, floor, view, isActive, notes } = await req.json()

  if (!roomNumber)
    return NextResponse.json({ error: "roomNumber is required" }, { status: 400 })

  const room = await prisma.room.create({
    data: { roomTypeId, roomNumber, floor, view, isActive, notes },
  })

  return NextResponse.json(room, { status: 201 })
}