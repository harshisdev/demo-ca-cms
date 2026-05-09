import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    await connectDB();

    // Receive FormData
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

    // Validate image size (2MB)
    const maxSize = 2 * 1024 * 1024;

    if (image.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Image size should be less than 2MB",
        },
        { status: 400 },
      );
    }

    // Convert image to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64
    const base64Image = `data:${image.type};base64,${buffer.toString(
      "base64",
    )}`;

    // Upload image to Cloudinary
    let uploadResponse;

    try {
      uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "uploads",
      });
    } catch (uploadError) {
      console.log(uploadError);

      return NextResponse.json(
        {
          success: false,
          message: "Image upload failed",
        },
        { status: 500 },
      );
    }

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
      image: uploadResponse.secure_url,
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
