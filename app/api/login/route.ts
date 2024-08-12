// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Replace with your actual authentication logic
  if (email === "test@example.com" && password === "password") {
    // Simulate a successful login
    return NextResponse.json({ message: "Login successful" });
  } else {
    // Simulate a failed login
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }
}
