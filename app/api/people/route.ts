import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const people = await prisma.person.findMany({
      include: {
        business: true,
        tags: true,
        tasks: true,
      },
    });

    return NextResponse.json(people, { status: 200 });
  } catch (err: unknown) {
    console.error("Error fetching people:", err);

    const message =
      err instanceof Error ? err.message : "Failed to fetch people";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
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
  } catch (err: unknown) {
    console.error("Error creating person:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create person" },
      { status: 500 }
    );
  }
}
