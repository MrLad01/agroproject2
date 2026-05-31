import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/dining/categories
export async function GET() {

  const [diningCategories, topCategories] = await Promise.all([
    prisma.diningCategory.findMany({
      orderBy: { order: "asc" },
      include: { asset: true },
    }),
    prisma.topCategory.findMany({
      orderBy: { order: "asc" },
      include: { asset: true },
    }),
  ])

  return NextResponse.json({ diningCategories, topCategories })
}

// PUT /api/admin/dining/categories
// Body: { diningCategories: [...], topCategories: [...] }
export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { diningCategories = [], topCategories = [] } = await req.json()

  // ── Dining categories ─────────────────────────────────────────
  const existingDC   = diningCategories.filter((c: any) => c.id && !c.id.startsWith("new-"))
  const newDC        = diningCategories.filter((c: any) => !c.id || c.id.startsWith("new-"))
  const existingDCIds = existingDC.map((c: any) => c.id)

  await prisma.$transaction([
    prisma.diningCategory.deleteMany({ where: { id: { notIn: existingDCIds } } }),
    ...existingDC.map((c: any) =>
      prisma.diningCategory.update({
        where: { id: c.id },
        data:  { label: c.label, title: c.title, order: c.order, assetId: c.assetId },
      })
    ),
    ...newDC.map((c: any) =>
      prisma.diningCategory.create({
        data: { label: c.label, title: c.title, order: c.order, assetId: c.assetId },
      })
    ),
  ])

  // ── Top categories ────────────────────────────────────────────
  const existingTC    = topCategories.filter((c: any) => c.id && !c.id.startsWith("new-"))
  const newTC         = topCategories.filter((c: any) => !c.id || c.id.startsWith("new-"))
  const existingTCIds = existingTC.map((c: any) => c.id)

  await prisma.$transaction([
    prisma.topCategory.deleteMany({ where: { id: { notIn: existingTCIds } } }),
    ...existingTC.map((c: any) =>
      prisma.topCategory.update({
        where: { id: c.id },
        data:  { label: c.label, order: c.order, assetId: c.assetId },
      })
    ),
    ...newTC.map((c: any) =>
      prisma.topCategory.create({
        data: { label: c.label, order: c.order, assetId: c.assetId },
      })
    ),
  ])

  const [updatedDC, updatedTC] = await Promise.all([
    prisma.diningCategory.findMany({ orderBy: { order: "asc" }, include: { asset: true } }),
    prisma.topCategory.findMany({ orderBy: { order: "asc" }, include: { asset: true } }),
  ])

  return NextResponse.json({ diningCategories: updatedDC, topCategories: updatedTC })
}