import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // FormData receive
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const address = formData.get("address");
    const password = formData.get("password");
    const image = formData.get("image");

    // Validation
    if (!name || !email || !mobile || !address || !password || !image) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    // Check existing user
    const existingUser = await UserProfile.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 },
      );
    }

    // Validate image type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only PNG and JPG images allowed",
        },
        { status: 400 },
      );
    }

    // Convert image buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create image path
    const fileName = `${Date.now()}-${image.name}`;

    // Save inside public/uploads
    const fs = require("fs");
    const path = require("path");

    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Create folder if not exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserProfile.create({
      name,
      email,
      mobile,
      address,
      password: hashedPassword,
      role: "admin",
      image: `/uploads/${fileName}`,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin registered successfully",

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          address: user.address,
          image: user.image,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
