import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 })
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 })
  }

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } })
    return NextResponse.json({ error: "Token expired" }, { status: 400 })
  }

  // Mark user as verified
  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { emailVerified: new Date() },
  })

  // Clean up the token
  await prisma.verificationToken.delete({ where: { token } })

  // Redirect to login or a success page
  return NextResponse.redirect(new URL("/login?verified=true", req.url))
}