import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect Database
    await connectDB();

    // Get request body
    const { email, password, role, forceLogin } = await req.json();

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

    // ================= ACTIVE SESSION CHECK =================

    if (user.isLoggedIn && user.sessionId && user.lastActivity) {
      const now = Date.now();

      const lastActivity = new Date(user.lastActivity).getTime();

      const diffMinutes = (now - lastActivity) / 1000 / 60;

      // Session still active
      if (diffMinutes <= 1 && !forceLogin) {
        return NextResponse.json(
          {
            success: false,
            logoutAll: true,
            message: "User already logged in on another device",
          },
          { status: 403 },
        );
      }

      // Auto clear expired session
      user.sessionId = null;
      user.isLoggedIn = false;
      user.lastActivity = null;

      await user.save();
    }

    // ================= CREATE NEW SESSION =================

    const sessionId = uuidv4();

    user.sessionId = sessionId;
    user.isLoggedIn = true;
    user.lastActivity = new Date();

    await user.save();

    // ================= GENERATE TOKEN =================

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        sessionId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // ================= RESPONSE =================

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

    // ================= COOKIE =================

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
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
