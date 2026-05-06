import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect Database
    await connectDB();

    // Get request body
    const { email, password, role } = await req.json();

    // Validation
    if (!email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    // Find user and include password
    const user = await UserProfile.findOne({
      email,
    }).select("+password");

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

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // Invalid password
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        {
          status: 401,
        },
      );
    }

    // Role check
    if (user.role !== role) {
      return NextResponse.json(
        {
          success: false,
          message: `Access denied for ${role}`,
        },
        {
          status: 403,
        },
      );
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // Create Response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          address: user.address,
          image: user.image,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      {
        status: 200,
      },
    );

    // Set Cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
