import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect DB
    await connectDB();

    // Get email
    const { email } = await req.json();

    // Find user
    const user = await UserProfile.findOne({
      email,
    });

    // User not found
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // Logout all devices
    user.sessionId = null;
    user.isLoggedIn = false;
    user.lastActivity = null;

    // Save user
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "All devices logged out",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
