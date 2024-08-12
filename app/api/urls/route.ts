// app/api/urls/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId, originalUrl, shortenedUrl } = await request.json();

  try {
    const url = await prisma.url.create({
      data: {
        original: originalUrl,
        shortened: shortenedUrl,
        userId,
      },
    });
    return NextResponse.json(url);
  } catch (error) {
    return NextResponse.error();
  }
}
