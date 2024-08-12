// app/api/signup/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Replace with your actual signup logic
  if (email && password) {
    // Simulate a successful signup
    return NextResponse.json({ message: "Signup successful" });
  } else {
    // Simulate a failed signup
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }
}
