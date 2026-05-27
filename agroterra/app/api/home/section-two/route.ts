import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/homepage/section-two
export async function GET() {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const sectionTwo = await prisma.sectionTwo.findFirst()

  // Seed a default row if none exists
  if (!sectionTwo) {
    const created = await prisma.sectionTwo.create({
      data: {
        label:      "Explore",
        heading:    "A Place That Fits You",
        subheading: "Choose from spacious suites designed to give you and your loved ones the comfort, privacy, and serenity you deserve.",
        expLabel:   "Experiences",
        expHeading: "Harmony With Nature",
      },
    })
    return NextResponse.json(created)
  }

  return NextResponse.json(sectionTwo)
}

// PUT /api/admin/homepage/section-two
export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id, label, heading, subheading, expLabel, expHeading } = await req.json()

  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 })

  const updated = await prisma.sectionTwo.update({
    where: { id },
    data:  { label, heading, subheading, expLabel, expHeading },
  })

  return NextResponse.json(updated)
}