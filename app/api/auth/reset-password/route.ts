import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token, password, confirmPassword } = await req.json();

    console.log(password);
    console.log(confirmPassword);
    if (password !== confirmPassword)
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    if (!resetToken)
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );

    if (resetToken.expiresAt < new Date())
      return NextResponse.json({ error: "Token expired" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashed },
    });

    await prisma.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
