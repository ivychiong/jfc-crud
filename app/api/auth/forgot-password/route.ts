import crypto from "crypto";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({
        message: "If that email exists, a link has been sent.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: { email, token, expiresAt },
    });

    const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested a password reset. Click below to reset your password:</p>
        <a href="${resetLink}" target="_blank">Reset Password</a>
        <p>This link will expire in 60 minutes.</p>
      `,
    });

    return NextResponse.json({
      message: "Password reset link sent to your email.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send reset link" },
      { status: 500 }
    );
  }
}
