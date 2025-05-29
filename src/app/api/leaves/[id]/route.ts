import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();
  if (!["APPROVED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await prisma.leave.update({
    where: { id: params.id },
    data: { status },
  });

  // ─── Notify the employee of approval/rejection ───────────────────────────
  await prisma.notification.create({
    data: {
      userId: updated.employeeId,
      type: status === "APPROVED" ? "LEAVE_APPROVED" : "LEAVE_REJECTED",
      message: `Your leave request from ${updated.startDate.toDateString()} to ${updated.endDate.toDateString()} has been ${status.toLowerCase()}.`,
    },
  });

  return NextResponse.json(updated);
}
