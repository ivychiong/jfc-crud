import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const businessId = await Number(params.id);
  if (isNaN(businessId)) {
    return NextResponse.json({ error: "Invalid business ID" }, { status: 400 });
  }

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    include: {
      categories: true,
      tags: true,
    },
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  return NextResponse.json(business);
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const businessId = await Number(params.id);

    await prisma.business.delete({
      where: { id: businessId },
    });

    return NextResponse.json(
      { message: "Business deleted successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error deleting business:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to delete business",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: Params) {
  const businessId = Number(params.id);
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
  } catch (err: unknown) {
    console.error("Error updating business:", err);
    const message =
      err instanceof Error ? err.message : "Failed to update business";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
