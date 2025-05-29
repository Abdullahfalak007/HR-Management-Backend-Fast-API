// File: src/app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json(
      { message: "Email and OTP are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (
    !user ||
    !user.otp ||
    !user.otpExpiresAt ||
    user.otp !== otp ||
    new Date() > user.otpExpiresAt
  ) {
    return NextResponse.json(
      { message: "Invalid or expired OTP" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "OTP verified" }, { status: 200 });
}
