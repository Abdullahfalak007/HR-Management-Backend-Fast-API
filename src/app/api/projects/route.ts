import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { startDate: "desc" },
    include: {
      assignee: { select: { id: true, name: true, avatar: true } },
    },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const { title, description, startDate, endDate, employeeId } =
    await req.json();

  if (!title || !startDate || !endDate || !employeeId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const project = await prisma.project.create({
    data: {
      title: title.trim(),
      description: description?.trim() || null,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: "IN_PROGRESS",
      employeeId,
    },
  });

  // ─── Create a notification for the assignee ───────────────────────────────
  await prisma.notification.create({
    data: {
      userId: employeeId,
      type: "PROJECT_ASSIGNED",
      message: `You have been assigned a new project: "${
        project.title
      }". Deadline is ${project.endDate.toDateString()}.`,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
