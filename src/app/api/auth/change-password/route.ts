import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { authOptions } from "../[...nextauth]/route";

export async function POST(req: Request) {
  // 1) Make sure they’re signed in
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // 2) Grab payload
  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { message: "Both current and new passwords are required" },
      { status: 400 }
    );
  }

  // 3) Fetch user & verify current password
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user?.password) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) {
    return NextResponse.json(
      { message: "Current password is incorrect" },
      { status: 400 }
    );
  }

  // 4) Hash & save the new one
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashed },
  });

  return NextResponse.json(
    { message: "Password changed successfully" },
    { status: 200 }
  );
}
