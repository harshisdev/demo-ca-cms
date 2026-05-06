import connectDB from "@/lib/mongodb";
import User from "@/models/User";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, role } = await req.json();

    // find user
    const user = await User.findOne({
      email,
    });

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

    // password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          message: "Invalid password",
        },
        {
          status: 401,
        },
      );
    }

    // role check
    if (user.role !== role) {
      return NextResponse.json(
        {
          message: `Access denied for ${role}`,
        },
        {
          status: 403,
        },
      );
    }

    // jwt token
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

    // response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",

      path: "/",

      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
