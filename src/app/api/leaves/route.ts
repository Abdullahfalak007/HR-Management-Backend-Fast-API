import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const leaves = await prisma.leave.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      employee: {
        select: {
          id: true,
          name: true,
          personalInfo: { select: { email: true } },
          accountLinks: { select: { email: true } },
          avatar: true,
        },
      },
    },
  });
  return NextResponse.json(leaves);
}

export async function POST(req: Request) {
  const { employeeId, reason, startDate, endDate } = await req.json();

  if (!employeeId || !reason || !startDate || !endDate) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const leave = await prisma.leave.create({
    data: {
      employeeId,
      reason,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: "PENDING",
    },
  });

  // ─── Create a notification for the requester ──────────────────────────────
  await prisma.notification.create({
    data: {
      userId: employeeId,
      type: "LEAVE_SUBMITTED",
      message: `Your leave request from ${startDate} to ${endDate} has been submitted.`,
    },
  });

  return NextResponse.json(leave, { status: 201 });
}
