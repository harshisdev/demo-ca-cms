import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const data = await req.formData();

    const image = data.get("file");

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "No image found",
        },
        { status: 400 },
      );
    }

    // VALIDATE TYPE
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only PNG and JPG allowed",
        },
        { status: 400 },
      );
    }

    // VALIDATE SIZE
    const maxSize = 2 * 1024 * 1024;

    if (image.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Image should be less than 2MB",
        },
        { status: 400 },
      );
    }

    // BUFFER
    const bytes = await image.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // BASE64
    const base64Image = `data:${image.type};base64,${buffer.toString(
      "base64",
    )}`;

    // UPLOAD CLOUDINARY
    const uploaded = await cloudinary.uploader.upload(base64Image, {
      folder: "footer",
    });

    return NextResponse.json({
      success: true,
      url: uploaded.secure_url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
