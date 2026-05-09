import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

export async function POST(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserProfile.findById(decoded.id);

    if (!user) {
      return NextResponse.json({
        success: false,
      });
    }

    // Restore session
    user.sessionId = decoded.sessionId;
    user.isLoggedIn = true;
    user.lastActivity = new Date();

    await user.save();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
    });
  }
}
