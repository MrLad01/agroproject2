import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"
import { sendVerificationEmail } from "@/lib/mail" // you'll create this

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashed }, // emailVerified is null = unverified
  })

  // Create a verification token
  const token = randomUUID()
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours

  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  })

  // Send email with the token
  await sendVerificationEmail(email, token)

  return NextResponse.json({ message: "Check your email to verify your account" }, { status: 201 })
}