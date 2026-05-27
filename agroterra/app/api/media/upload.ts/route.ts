// app/api/admin/media/upload/route.ts
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import cloudinary from "@/lib/cloudinaryService"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File
  const title = formData.get("title") as string

  if (!file || !title) {
    return NextResponse.json({ error: "File and title are required" }, { status: 400 })
  }

  // Detect resource type from file mime type
  const resourceType = file.type.startsWith("video/") ? "video" : "image"

  const arrayBuffer = await file.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString("base64")
  const dataUri = `data:${file.type};base64,${base64}`

  const uploaded = await cloudinary.uploader.upload(dataUri, {
    folder: "Agroterra project",
    resource_type: resourceType,  
  })

  const asset = await prisma.mediaAsset.create({
    data: {
      title,
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      resourceType,  
    },
  })

  return NextResponse.json(asset, { status: 201 })
}