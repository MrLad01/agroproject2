import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/rooms/types/[id]/tabs
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // const session = await auth()
  // if (!session?.user.isAdmin)
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const tabs = await prisma.roomTab.findMany({
    where:   { roomTypeId: id },
    orderBy: { order: "asc" },
    include: {
      image:      true,
      paragraphs: { orderBy: { order: "asc" } },
    },
  })

  return NextResponse.json(tabs)
}

// PUT /api/admin/rooms/types/[id]/tabs
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id: roomTypeId } = await params
  const body: any[] = await req.json()

  if (!Array.isArray(body))
    return NextResponse.json({ error: "Expected an array" }, { status: 400 })

  // IDs of tabs that already exist in the DB (exclude new- prefixed ones)
  const existingTabIds = body
    .map((t: any) => t.id)
    .filter((id: string) => id && !id.startsWith("new-"))

  // Delete any tabs for this room type that are no longer in the payload
  await prisma.roomTab.deleteMany({
    where: {
      roomTypeId,
      id: { notIn: existingTabIds },
    },
  })

  // Upsert each tab in the payload
  for (const tab of body) {
    const { paragraphs = [], id: tabId, ...tabData } = tab
    const isNew = !tabId || tabId.startsWith("new-")

    let savedTab: { id: string }

    if (isNew) {
      savedTab = await prisma.roomTab.create({
        data: {
          roomTypeId,
          key:      tabData.key,
          eyebrow:  tabData.eyebrow,
          title:    tabData.title,
          tagline:  tabData.tagline,
          size:     tabData.size,
          beds:     tabData.beds,
          bath:     tabData.bath,
          guests:   tabData.guests,
          videoSrc: tabData.videoSrc,
          order:    tabData.order,
          imageId:  tabData.imageId,
        },
      })
    } else {
      savedTab = await prisma.roomTab.update({
        where: { id: tabId },
        data: {
          key:      tabData.key,
          eyebrow:  tabData.eyebrow,
          title:    tabData.title,
          tagline:  tabData.tagline,
          size:     tabData.size,
          beds:     tabData.beds,
          bath:     tabData.bath,
          guests:   tabData.guests,
          videoSrc: tabData.videoSrc,
          order:    tabData.order,
          imageId:  tabData.imageId,
        },
      })
    }

    const existingParas   = paragraphs.filter((p: any) => p.id && !p.id.startsWith("new-"))
    const newParas        = paragraphs.filter((p: any) => !p.id || p.id.startsWith("new-"))
    const existingParaIds = existingParas.map((p: any) => p.id)

    await prisma.$transaction([
      // Remove paragraphs no longer in the payload for this tab
      prisma.roomTabParagraph.deleteMany({
        where: { tabId: savedTab.id, id: { notIn: existingParaIds } },
      }),
      ...existingParas.map((p: any) =>
        prisma.roomTabParagraph.update({
          where: { id: p.id },
          data:  { text: p.text, order: p.order },
        })
      ),
      ...newParas.map((p: any) =>
        prisma.roomTabParagraph.create({
          data: { tabId: savedTab.id, text: p.text, order: p.order },
        })
      ),
    ])
  }

  const updated = await prisma.roomTab.findMany({
    where:   { roomTypeId },
    orderBy: { order: "asc" },
    include: {
      image:      true,
      paragraphs: { orderBy: { order: "asc" } },
    },
  })

  return NextResponse.json(updated)
}