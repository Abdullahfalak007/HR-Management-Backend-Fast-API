// src/app/api/attendance/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { status } = body;

  if (typeof status !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid status" },
      { status: 400 }
    );
  }

  const updated = await prisma.attendance.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(updated);
}
