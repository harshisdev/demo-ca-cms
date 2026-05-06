import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";

import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,

      user: {
        ...user.toObject(),

        image:
          user.image ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name,
          )}&background=random&color=fff`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      },
    );
  }
}
