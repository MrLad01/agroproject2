// app/api/media/[id]/route.ts
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import cloudinary from "@/lib/cloudinaryService"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  const session = await auth()
  if (!session?.user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params 

  const asset = await prisma.mediaAsset.findUnique({
    where: { id },
  })

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 })
  }

  await cloudinary.uploader.destroy(asset.publicId, {
    resource_type: asset.resourceType as "image" | "video",
  })

  await prisma.mediaAsset.delete({ where: { id } })

  return NextResponse.json({ success: true })
}