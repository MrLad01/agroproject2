import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// ── GET /api/admin/dining/menu ────────────────────────────────────
export async function GET() {

  const sections = await prisma.menuSection.findMany({
    orderBy: { order: "asc" },
    include: { items: { orderBy: { order: "asc" } } },
  })

  return NextResponse.json(sections)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  let body: any[]
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!Array.isArray(body))
    return NextResponse.json({ error: "Expected an array" }, { status: 400 })

  const savedSectionIds: string[] = []

  for (const section of body) {
    const { items = [], id: rawSecId, title, order } = section
    const isNewSection = !rawSecId || String(rawSecId).startsWith("new-")

    // 1a. Upsert section
    let sectionId: string

    if (isNewSection) {
      const created = await prisma.menuSection.create({
        data: { title, order },
      })
      sectionId = created.id
    } else {
      await prisma.menuSection.update({
        where: { id: rawSecId },
        data:  { title, order },
      })
      sectionId = rawSecId
    }

    savedSectionIds.push(sectionId)

    // 1b. Split items into new vs existing
    const existingItems = (items as any[]).filter(
      (i) => i.id && !String(i.id).startsWith("new-")
    )
    const newItems = (items as any[]).filter(
      (i) => !i.id || String(i.id).startsWith("new-")
    )

    const createdItemIds: string[] = []
    for (const item of newItems) {
      const created = await prisma.menuItem.create({
        data: {
          sectionId,
          name:  item.name  ?? "",
          desc:  item.desc  ?? "",
          cat:   item.cat   ?? "",
          order: item.order ?? 0,
        },
      })
      createdItemIds.push(created.id)
    }

    // 1d. Update existing items
    for (const item of existingItems) {
      await prisma.menuItem.update({
        where: { id: item.id },
        data: {
          name:  item.name  ?? "",
          desc:  item.desc  ?? "",
          cat:   item.cat   ?? "",
          order: item.order ?? 0,
        },
      })
    }

    //     the payload (i.e. the user removed them)
    const keptItemIds = [
      ...existingItems.map((i: any) => i.id),
      ...createdItemIds,
    ]

    await prisma.menuItem.deleteMany({
      where: {
        sectionId,
        ...(keptItemIds.length > 0 && { id: { notIn: keptItemIds } }),
      },
    })
  }

  const incomingRealIds = body
    .filter((s) => s.id && !String(s.id).startsWith("new-"))
    .map((s) => s.id)

  if (savedSectionIds.length > 0) {
    await prisma.menuSection.deleteMany({
      where: { id: { notIn: savedSectionIds } },
    })
  } else {
    // Nothing was saved — wipe everything (full clear)
    await prisma.menuSection.deleteMany({})
  }

  // ── Step 3: return the fresh state from DB ─────────────────────
  const updated = await prisma.menuSection.findMany({
    orderBy: { order: "asc" },
    include: { items: { orderBy: { order: "asc" } } },
  })

  return NextResponse.json(updated)
}