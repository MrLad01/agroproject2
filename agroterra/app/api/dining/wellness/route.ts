import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/dining/wellness
export async function GET() {

  const articles = await prisma.wellnessArticle.findMany({
    orderBy: { order: "asc" },
    include: { asset: true },
  })

  return NextResponse.json(articles)
}

// POST /api/admin/dining/wellness
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { cat, title, excerpt, readTime, isHero, order, assetId } = await req.json()

  if (!title || !cat)
    return NextResponse.json({ error: "title and cat are required" }, { status: 400 })

  // If setting as hero, unset existing hero
  if (isHero) {
    await prisma.wellnessArticle.updateMany({
      where: { isHero: true },
      data:  { isHero: false },
    })
  }

  const article = await prisma.wellnessArticle.create({
    data: {
      cat, title, excerpt,
      readTime: readTime ?? "3 min read",
      isHero:   isHero   ?? false,
      order:    order    ?? 0,
      assetId,
    },
    include: { asset: true },
  })

  return NextResponse.json(article, { status: 201 })
}