import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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
  } catch (err: unknown) {
    console.error("Error fetching businesses:", err);

    const message =
      err instanceof Error ? err.message : "Failed to fetch businesses";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
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
