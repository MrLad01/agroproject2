import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/dining/recipes/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { asset: true },
  })

  if (!recipe)
    return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(recipe)
}

// PUT /api/admin/dining/recipes/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const {
    label, title, desc, time, cat,
    gradientFrom, gradientTo, order,
    isFeatured, assetId,
  } = await req.json()

  // If setting as featured, unset all others first
  if (isFeatured) {
    await prisma.recipe.updateMany({
      where: { isFeatured: true, id: { not: id } },
      data:  { isFeatured: false },
    })
  }

  const recipe = await prisma.recipe.update({
    where: { id },
    data: {
      label, title, desc, time, cat,
      gradientFrom, gradientTo, order,
      isFeatured, assetId,
    },
    include: { asset: true },
  })

  return NextResponse.json(recipe)
}

// DELETE /api/admin/dining/recipes/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await prisma.recipe.delete({ where: { id } })

  return NextResponse.json({ success: true })
}