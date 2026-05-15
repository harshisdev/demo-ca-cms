// app/api/footer/route.js

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Footer from "@/models/Footer";

// GET FOOTER
export async function GET() {
  try {
    await connectDB();

    const footer = await Footer.findOne();

    return NextResponse.json({
      success: true,
      data: footer,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE / UPDATE FOOTER
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    let footer = await Footer.findOne();

    if (footer) {
      footer = await Footer.findByIdAndUpdate(footer._id, body, {
        new: true,
      });
    } else {
      footer = await Footer.create(body);
    }

    return NextResponse.json({
      success: true,
      data: footer,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
