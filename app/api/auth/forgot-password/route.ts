import crypto from "crypto";

import { NextResponse } from "next/server";
import { Resend } from "resend";

import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/utils";

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

    const resetLink = `${getBaseUrl()}/reset-password?token=${token}`;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "JFC Crud Test Only <noreply@resend.dev>",
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
