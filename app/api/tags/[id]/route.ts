import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("cookie")?.split("token=")?.[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updated = await prisma.tag.update({
      where: { id: Number(params.id) },
      data: { name },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update tag" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("cookie")?.split("token=")?.[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.tag.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Tag deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete tag" },
      { status: 500 }
    );
  }
}
