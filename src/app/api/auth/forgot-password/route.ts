import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { transporter } from "@/lib/nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({
        message:
          "If a matching account was found, an OTP has been sent to your email.",
      });
    }

    // Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Update user record with OTP info
    await prisma.user.update({
      where: { email },
      data: {
        otp: otp,
        otpExpiresAt: otpExpiresAt,
      },
    });

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "OTP has been sent to your email.",
      // Do not return the OTP in production:
      otp, // For testing only.
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
