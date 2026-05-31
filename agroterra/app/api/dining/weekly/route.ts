import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/dining/weekly
export async function GET() {

  const [featured, sides] = await Promise.all([
    prisma.weeklyFeatured.upsert({
      where:  { id: "main" },
      update: {},
      create: {
        id:    "main",
        label: "BREAKFAST",
        title: "Have The Best Delicacies At Your Door Step",
      },
      include: { asset: true },
    }),
    prisma.weeklySide.findMany({
      orderBy: { order: "asc" },
      include: { asset: true },
    }),
  ])

  return NextResponse.json({ featured, sides })
}

// PUT /api/admin/dining/weekly
// Body: { featured: { label, title, assetId }, sides: [...] }
export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { featured, sides = [] } = await req.json()

  // Update featured
  const updatedFeatured = await prisma.weeklyFeatured.upsert({
    where:  { id: "main" },
    update: { label: featured.label, title: featured.title, assetId: featured.assetId },
    create: {
      id:      "main",
      label:   featured.label,
      title:   featured.title,
      assetId: featured.assetId,
    },
    include: { asset: true },
  })

  // Update sides — same new- pattern
  const existingSides    = sides.filter((s: any) => s.id && !s.id.startsWith("new-"))
  const newSides         = sides.filter((s: any) => !s.id || s.id.startsWith("new-"))
  const existingSideIds  = existingSides.map((s: any) => s.id)

  await prisma.$transaction([
    prisma.weeklySide.deleteMany({ where: { id: { notIn: existingSideIds } } }),
    ...existingSides.map((s: any) =>
      prisma.weeklySide.update({
        where: { id: s.id },
        data:  { label: s.label, title: s.title, order: s.order, assetId: s.assetId },
      })
    ),
    ...newSides.map((s: any) =>
      prisma.weeklySide.create({
        data: { label: s.label, title: s.title, order: s.order, assetId: s.assetId },
      })
    ),
  ])

  const updatedSides = await prisma.weeklySide.findMany({
    orderBy: { order: "asc" },
    include: { asset: true },
  })

  return NextResponse.json({ featured: updatedFeatured, sides: updatedSides })
}