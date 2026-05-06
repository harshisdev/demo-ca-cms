import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Profile from "@/models/Profile";

// 🔌 DB CONNECT (make sure you have this)
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

// ✅ GET (All profiles OR single)
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const profile = await Profile.findById(id);
      return NextResponse.json(profile);
    }

    const profiles = await Profile.find().sort({ createdAt: -1 });
    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ POST (Create)
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();

    const profile = await Profile.create(body);

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ PUT (Update)
export async function PUT(req) {
  await connectDB();

  try {
    const body = await req.json();

    if (!body._id) {
      return NextResponse.json({ error: "_id is required" }, { status: 400 });
    }

    const updated = await Profile.findByIdAndUpdate(body._id, body, {
      new: true,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ DELETE
export async function DELETE(req) {
  await connectDB();

  const body = await req.json(); // ✅ read body
  const id = body.id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await Profile.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}
