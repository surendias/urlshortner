// app/api/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        urls: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error();
  }
}
