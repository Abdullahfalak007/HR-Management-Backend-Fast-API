// src/app/api/employees/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ─── GET a single employee ─────────────────────────────────────────────────────
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
    });
    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error("[EMPLOYEE_GET_ONE]", error);
    return NextResponse.json(
      { message: "Failed to fetch employee" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  // Build up only the bits you actually got
  const updateData: Record<string, unknown> = {};

  if (body.employee) Object.assign(updateData, body.employee);

  // Remove firstName and lastName from personalInfo if present
  if (body.personalInfo) {
    const { firstName, lastName, ...restPersonalInfo } = body.personalInfo;
    updateData.personalInfo = { set: restPersonalInfo };
  }
  if (body.professionalInfo)
    updateData.professionalInfo = { set: body.professionalInfo };
  if (body.documents) updateData.documents = { set: body.documents };
  if (body.accountLinks) updateData.accountLinks = { set: body.accountLinks };

  try {
    const updated = await prisma.employee.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[EMPLOYEE_PATCH] error:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to update employee",
      },
      { status: 500 }
    );
  }
}

// ─── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.employee.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
  } catch (error) {
    console.error("[EMPLOYEE_DELETE]", error);
    return NextResponse.json(
      { message: "Failed to delete employee" },
      { status: 500 }
    );
  }
}
