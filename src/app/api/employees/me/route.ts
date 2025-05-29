// src/app/api/employees/me/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  // 1) Get NextAuth session
  const session = await getServerSession(authOptions);
  const yourEmail = session?.user?.email;
  if (!yourEmail) {
    return NextResponse.json({ id: null });
  }

  try {
    // 2) Fetch id + both embedded emails for all employees
    const list = await prisma.employee.findMany({
      select: {
        id: true,
        accountLinks: { select: { email: true } },
        personalInfo: { select: { email: true } },
      },
    });

    // 3) Find the record with either matching email
    const me = list.find(
      (e: {
        id: string;
        accountLinks: { email: string };
        personalInfo: { email: string };
      }) =>
        e.accountLinks.email === yourEmail || e.personalInfo.email === yourEmail
    );

    return NextResponse.json({ id: me?.id ?? null });
  } catch (err) {
    console.error("[me] error:", err);
    return NextResponse.json({ id: null });
  }
}
