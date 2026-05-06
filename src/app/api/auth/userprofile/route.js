import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";


export async function GET(req) {
  try {
    await connectDB();

    // Get token
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user details
    const user = await UserProfile.findById(decoded.id);

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

    // Return all user data except password
    return NextResponse.json(
      {
        success: true,

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,

          mobile: user.mobile || "",

          address: user.address || "",

          image:
            user.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name,
            )}&background=random&color=fff`,

          role: user.role,

          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
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
        message: "Invalid token",
      },
      {
        status: 401,
      },
    );
  }
}
