import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
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
    const businessId = Number(id);

    if (isNaN(businessId)) {
      return NextResponse.json(
        { error: "Invalid business ID" },
        { status: 400 }
      );
    }

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        categories: true,
        tags: true,
      },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(business);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch business" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
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
    const businessId = Number(id);

    await prisma.business.delete({
      where: { id: businessId },
    });

    return NextResponse.json(
      { message: "Business deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete person" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: Params) {
  const token = req.headers.get("cookie")?.split("token=")?.[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { id } = await params;
  const businessId = Number(id);

  if (isNaN(businessId)) {
    return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
  }

  const body = await req.json();
  const { businessName, contactEmail, categories, tags } = body;

  try {
    const updatedBusiness = await prisma.business.update({
      where: { id: businessId },
      data: {
        name: businessName,
        email: contactEmail || undefined,
        categories: {
          set: categories.map((id: string) => ({ id: Number(id) })),
        },
        tags: {
          set: tags.map((id: string) => ({ id: Number(id) })),
        },
      },
    });

    return NextResponse.json(updatedBusiness);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete business" },
      { status: 500 }
    );
  }
}
