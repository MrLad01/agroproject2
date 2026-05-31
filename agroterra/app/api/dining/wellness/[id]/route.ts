import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/dining/wellness/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params
  const article = await prisma.wellnessArticle.findUnique({
    where: { id },
    include: { asset: true },
  })

  if (!article)
    return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(article)
}

// PUT /api/admin/dining/wellness/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const { cat, title, excerpt, readTime, isHero, order, assetId } = await req.json()

  if (isHero) {
    await prisma.wellnessArticle.updateMany({
      where: { isHero: true, id: { not: id } },
      data:  { isHero: false },
    })
  }

  const article = await prisma.wellnessArticle.update({
    where: { id },
    data:  { cat, title, excerpt, readTime, isHero, order, assetId },
    include: { asset: true },
  })

  return NextResponse.json(article)
}

// DELETE /api/admin/dining/wellness/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await prisma.wellnessArticle.delete({ where: { id } })

  return NextResponse.json({ success: true })
}