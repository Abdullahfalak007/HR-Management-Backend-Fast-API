// src/app/api/employees/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("[EMPLOYEE_GET]", error);
    return NextResponse.json(
      { message: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // 1) Read & log the raw body
  let body;
  try {
    body = await req.json();
    console.log("🛠️ POST /api/employees body:", body);
  } catch (err) {
    console.error("⚠️ Failed to parse JSON body:", err);
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const { employee, personalInfo, professionalInfo, documents, accountLinks } =
    body;

  // 2) Basic shape check
  if (!employee || !personalInfo || !professionalInfo || !accountLinks) {
    return NextResponse.json(
      { message: "Missing required sections" },
      { status: 400 }
    );
  }

  // 3) Validate top‐level employee fields
  const { name, employeeId, department, designation, type, status, avatar } =
    employee;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof employeeId !== "string" ||
    !employeeId.trim() ||
    typeof department !== "string" ||
    !department.trim() ||
    typeof designation !== "string" ||
    !designation.trim()
  ) {
    return NextResponse.json(
      {
        message:
          "Employee name, employeeId, department, and designation are required",
      },
      { status: 400 }
    );
  }

  // 4) Validate embedded personalInfo
  if (
    typeof personalInfo.firstName !== "string" ||
    !personalInfo.firstName.trim() ||
    typeof personalInfo.lastName !== "string" ||
    !personalInfo.lastName.trim() ||
    typeof personalInfo.email !== "string" ||
    !personalInfo.email.trim() ||
    typeof personalInfo.phone !== "string" ||
    !personalInfo.phone.trim()
  ) {
    return NextResponse.json(
      {
        message: "PersonalInfo must include firstName, lastName, email, phone",
      },
      { status: 400 }
    );
  }

  // 5) Validate embedded professionalInfo
  const { username, joiningDate, workingDays, officeLocation } =
    professionalInfo;
  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof joiningDate !== "string" ||
    !joiningDate.trim() ||
    typeof workingDays !== "string" ||
    !workingDays.trim() ||
    typeof officeLocation !== "string" ||
    !officeLocation.trim()
  ) {
    return NextResponse.json(
      {
        message:
          "ProfessionalInfo must include username, joiningDate, workingDays, officeLocation",
      },
      { status: 400 }
    );
  }

  // 6) All set — create the employee
  try {
    const created = await prisma.employee.create({
      data: {
        name: name.trim(),
        employeeId: employeeId.trim(),
        department: department.trim(),
        designation: designation.trim(),
        type: type?.trim() || "Office",
        status: status?.trim() || "Permanent",
        avatar: avatar?.trim() || null,

        personalInfo: {
          email: personalInfo.email.trim(),
          phone: personalInfo.phone.trim(),
          dob: personalInfo.dob,
          gender: personalInfo.gender,
          nationality: personalInfo.nationality,
          maritalStatus: personalInfo.maritalStatus,
          address: personalInfo.address,
          city: personalInfo.city,
          state: personalInfo.state,
          zipCode: personalInfo.zipCode,
        },

        professionalInfo: {
          username: username.trim(),
          joiningDate: joiningDate.trim(),
          workingDays: workingDays.trim(),
          officeLocation: officeLocation.trim(),
        },

        documents: {
          appointmentLetter: documents.appointmentLetter ?? null,
          salarySlip: documents.salarySlip ?? null,
          relievingLetter: documents.relievingLetter ?? null,
          experienceLetter: documents.experienceLetter ?? null,
        },

        accountLinks: {
          email: accountLinks.email ?? "",
          slackId: accountLinks.slackId ?? "",
          skypeId: accountLinks.skypeId ?? "",
          githubId: accountLinks.githubId ?? "",
        },
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("[EMPLOYEE_POST] Prisma error:", error);
    // If it's a unique‐constraint violation, surface that
    interface PrismaErrorMeta {
      target?: string[];
      [key: string]: unknown;
    }

    interface PrismaError {
      code?: string;
      meta?: PrismaErrorMeta;
      [key: string]: unknown;
    }

    const prismaError = error as PrismaError;

    if (
      prismaError &&
      prismaError.code === "P2002" &&
      prismaError.meta &&
      Array.isArray(prismaError.meta.target) &&
      prismaError.meta.target.includes("employeeId")
    ) {
      return NextResponse.json(
        { message: "An employee with that employeeId already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { 
        message: "Failed to create employee", 
        detail: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
