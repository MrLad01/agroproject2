// app/api/admin/media/route.ts
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(assets)
}