import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

export async function POST(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserProfile.findById(decoded.id);

      if (user) {
        user.sessionId = null;
        user.isLoggedIn = false;

        await user.save();
      }
    }

    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
      },
      {
        status: 500,
      },
    );
  }
}
