// src/app/api/notifications/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    // 1) grab the current user’s email from NextAuth
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      // not signed in, return empty array
      return NextResponse.json([], { status: 200 });
    }

    // 2) load every employee’s id + embedded emails, then find ours
    const allEmps = await prisma.employee.findMany({
      select: {
        id: true,
        personalInfo: { select: { email: true } },
        accountLinks: { select: { email: true } },
      },
    });
    interface EmployeePersonalInfo {
      email: string;
    }

    interface EmployeeAccountLinks {
      email: string;
    }

    interface Employee {
      id: string;
      personalInfo: EmployeePersonalInfo;
      accountLinks: EmployeeAccountLinks;
    }

    const emp: Employee | undefined = (allEmps as Employee[]).find(
      (e: Employee) =>
        e.personalInfo.email.toLowerCase() === email.toLowerCase() ||
        e.accountLinks.email.toLowerCase() === email.toLowerCase()
    );
    if (!emp) {
      // no matching Employee → no notifications
      return NextResponse.json([], { status: 200 });
    }

    // 3) fetch their notifications
    const notifs = await prisma.notification.findMany({
      where: { userId: emp.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(notifs, { status: 200 });
  } catch (err) {
    console.error("[NOTIF_GET_ERROR]", err);
    // on error, return an empty array rather than an object
    return NextResponse.json([], { status: 200 });
  }
}
