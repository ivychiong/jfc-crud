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

    const people = await prisma.person.findMany({
      include: {
        business: true,
        tags: true,
        tasks: true,
      },
    });

    return NextResponse.json(people, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch people" },
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
    const { firstName, lastName, email, phone, businessId, tags } = body;

    if (email) {
      const existing = await prisma.person.findFirst({ where: { email } });
      if (existing) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    const newPerson = await prisma.person.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email || null,
        phone: phone || null,
        business: businessId
          ? { connect: { id: Number(businessId) } }
          : undefined,
        tags: tags?.length
          ? { connect: tags.map((id: string) => ({ id: Number(id) })) }
          : undefined,
      },
    });

    return NextResponse.json(newPerson, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create person" },
      { status: 500 }
    );
  }
}
