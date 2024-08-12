// app/api/users/[userId]/urls/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId);

  try {
    const urls = await prisma.url.findMany({
      where: { userId },
    });
    return NextResponse.json(urls);
  } catch (error) {
    return NextResponse.error();
  }
}
