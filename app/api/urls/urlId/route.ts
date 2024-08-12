// app/api/urls/[urlId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { urlId: string } }
) {
  const urlId = parseInt(params.urlId);
  const { newShortenedUrl } = await request.json();

  try {
    const url = await prisma.url.update({
      where: { id: urlId },
      data: { shortened: newShortenedUrl },
    });
    return NextResponse.json(url);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { urlId: string } }
) {
  const urlId = parseInt(params.urlId);

  try {
    await prisma.url.delete({
      where: { id: urlId },
    });
    return NextResponse.json({ message: "URL deleted" });
  } catch (error) {
    return NextResponse.error();
  }
}
