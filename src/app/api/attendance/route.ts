// src/app/api/attendance/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  // fetch all attendance with employee basics
  const records = await prisma.attendance.findMany({
    orderBy: { date: "desc" },
    include: {
      employee: {
        select: {
          id: true,
          name: true,
          avatar: true,
          department: true,
          designation: true,
          type: true,
        },
      },
    },
  });

  return NextResponse.json(records);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { employeeId, date, checkIn, checkOut, breakTime, workHours, status } =
    body;

  if (!employeeId || !date || !checkIn || !checkOut || !status) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const att = await prisma.attendance.create({
    data: {
      employeeId,
      date: new Date(date),
      checkIn: new Date(`${date}T${checkIn}`),
      checkOut: new Date(`${date}T${checkOut}`),
      breakTime: breakTime || null,
      workHours: workHours || null,
      status,
    },
  });

  return NextResponse.json(att, { status: 201 });
}
