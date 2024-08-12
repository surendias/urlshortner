// app/api/users/[userId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId);
  const { newEmail } = await request.json();

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = parseInt(params.userId);

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.error();
  }
}
