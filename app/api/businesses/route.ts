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

    const businesses = await prisma.business.findMany({
      include: {
        people: true,
        tags: true,
        tasks: true,
        categories: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(businesses, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
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

    const body = await req.json();

    const { businessName, contactEmail = "", categories, tags } = body;

    const newBusiness = await prisma.business.create({
      data: {
        name: businessName,
        email: contactEmail,
        categories: {
          connect: categories?.map((id: string) => ({ id: Number(id) })) || [],
        },
        tags: {
          connect: tags?.map((id: string) => ({ id: Number(id) })) || [],
        },
      },
    });

    return NextResponse.json(newBusiness, { status: 201 });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to create business",
      },
      { status: 500 }
    );
  }
}
