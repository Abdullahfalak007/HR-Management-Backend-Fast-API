// src/app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // 1) Make sure the user is signed in
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2) Parse + validate the incoming status
  const { status } = await req.json();
  if (!["IN_PROGRESS", "COMPLETED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // 3) Load every employee’s id + both embedded emails
  const employees = await prisma.employee.findMany({
    select: {
      id: true,
      personalInfo: { select: { email: true } },
      accountLinks: { select: { email: true } },
    },
  });

  // 4) Find which one matches our session email
  const me = employees.find(
    (e) =>
      e.personalInfo.email === session.user.email ||
      e.accountLinks.email === session.user.email
  );
  if (!me) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // 5) Verify that THIS employee is the assignee on the project
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    select: { employeeId: true },
  });
  if (!project || project.employeeId !== me.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 6) All good—patch the status
  const updated = await prisma.project.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(updated);
}
