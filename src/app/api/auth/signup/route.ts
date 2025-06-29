import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user.model";
import { connectDB } from "@/libs/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const currUser = await userModel.findOne({ email: email });
    if (currUser) {
      return NextResponse.json(
        {
          error: "User already exists, please proceed to login page.",
        },
        { status: 400 }
      );
    }
    await userModel.create({
      email: email,
      password: password,
    });
    return NextResponse.json({ message: "User resgistered successfully!" });
  } catch (error) {
    console.log("Error registering User: ", error);

    throw new Error("Error registering User ");
  }
}
