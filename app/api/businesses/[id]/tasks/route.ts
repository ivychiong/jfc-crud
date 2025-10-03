import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const businessId = Number(id);

    const tasks = await prisma.task.findMany({ where: { businessId } });
    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch business tasks" },
      { status: 500 }
    );
  }
}
