// src/app/api/notifications/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { read } = body;
    if (typeof read !== "boolean") {
      return NextResponse.json(
        { error: "Missing or invalid `read` flag" },
        { status: 400 }
      );
    }
    const updated = await prisma.notification.update({
      where: { id: params.id },
      data: { read },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[NOTIF_PATCH_ERROR]", err);
    return NextResponse.json({ error: "Could not update" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.notification.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[NOTIF_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Could not delete" }, { status: 500 });
  }
}
