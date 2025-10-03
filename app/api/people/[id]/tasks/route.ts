import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const personId = Number(id);

    const tasks = await prisma.task.findMany({ where: { personId } });
    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch person tasks" },
      { status: 500 }
    );
  }
}
