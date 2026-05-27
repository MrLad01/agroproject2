// scripts/sync-cloudinary.ts
import { config } from "dotenv"
config({ path: ".env" })

import { v2 as cloudinary } from "cloudinary"
import { prisma } from "../lib/prisma"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

async function fetchResources(resourceType: "image" | "video") {
  const result = await cloudinary.api.resources({
    type: "upload",
    resource_type: resourceType,
    max_results: 500,  // 👈 no prefix filter
  })
  return result.resources
}

async function syncCloudinaryAssets() {
  const images = await fetchResources("image")
  const videos = await fetchResources("video")
  const allAssets = [...images, ...videos]

  console.log(`Found ${images.length} images and ${videos.length} videos`)

  for (const resource of allAssets) {
    const existing = await prisma.mediaAsset.findFirst({
      where: { publicId: resource.public_id },
    })

    if (!existing) {
      await prisma.mediaAsset.create({
        data: {
          title: resource.public_id.split("/").pop() ?? "Untitled",
          imageUrl: resource.secure_url,
          publicId: resource.public_id,
          resourceType: resource.resource_type,
        },
      })
      console.log(`Synced: ${resource.public_id}`)
    }
  }

  console.log("Sync complete")
  await prisma.$disconnect()
}

syncCloudinaryAssets()