import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const personId = Number(params.id);
  if (isNaN(personId)) {
    return NextResponse.json({ error: "Invalid person ID" }, { status: 400 });
  }

  const person = await prisma.person.findUnique({
    where: { id: personId },
    include: {
      business: true,
      tags: true,
    },
  });

  if (!person) {
    return NextResponse.json({ error: "Person not found" }, { status: 404 });
  }

  return NextResponse.json(person);
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const personId = Number(params.id);
    const body = await req.json();
    const { firstName, lastName, email, phone, businessId, tags } = body;

    const updatedPerson = await prisma.person.update({
      where: { id: personId },
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email || null,
        phone: phone || null,
        business: businessId
          ? { connect: { id: Number(businessId) } }
          : undefined,
        tags: tags
          ? { set: tags.map((id: string) => ({ id: Number(id) })) }
          : undefined,
      },
    });

    return NextResponse.json(updatedPerson, { status: 200 });
  } catch (err: unknown) {
    console.error("Error updating person:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update person" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const personId = await Number(params.id);

    await prisma.person.delete({
      where: { id: personId },
    });

    return NextResponse.json(
      { message: "Person deleted successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error deleting person:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete person" },
      { status: 500 }
    );
  }
}
