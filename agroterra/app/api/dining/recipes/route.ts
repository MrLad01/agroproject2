import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/dining/recipes
export async function GET() {

  const recipes = await prisma.recipe.findMany({
    orderBy: { order: "asc" },
    include: { asset: true },
  })

  return NextResponse.json(recipes)
}

// POST /api/admin/dining/recipes
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const {
    label, title, desc, time, cat,
    gradientFrom, gradientTo, order,
    isFeatured, assetId,
  } = await req.json()

  if (!title || !cat)
    return NextResponse.json({ error: "title and cat are required" }, { status: 400 })

  const recipe = await prisma.recipe.create({
    data: {
      label: label ?? cat.toUpperCase(),
      title, desc, time, cat,
      gradientFrom: gradientFrom ?? "#1a3a1a",
      gradientTo:   gradientTo   ?? "#2d5a1a",
      order:        order        ?? 0,
      isFeatured:   isFeatured   ?? false,
      assetId,
    },
    include: { asset: true },
  })

  return NextResponse.json(recipe, { status: 201 })
}