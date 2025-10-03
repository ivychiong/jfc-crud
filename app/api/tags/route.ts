import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("token=")?.[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const tags = await prisma.tag.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tags);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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

    const newTag = await prisma.tag.create({
      data: { name },
    });

    return NextResponse.json(newTag, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 }
    );
  }
}
