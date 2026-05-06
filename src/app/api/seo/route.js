import connectDB from "@/lib/mongodb";
import Seo from "@/models/Seo";
import { NextResponse } from "next/server";
import Location from "@/models/Location";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  // ✅ get all locations
  const locations = await Location.find().select("slug");

  const validSlugs = locations.map((l) => l.slug);

  // ✅ if no path → return only valid SEO
  if (!path) {
    const allSeo = await Seo.find({
      path: { $in: validSlugs }, // 👈 filter here
    }).sort({ createdAt: -1 });

    return NextResponse.json(allSeo);
  }

  // ✅ single SEO with validation
  const isValid = validSlugs.includes(path);

  if (!isValid) {
    return NextResponse.json({
      title: "Default Title",
      description: "Default description",
    });
  }

  const seo = await Seo.findOne({ path });

  if (!seo) {
    return NextResponse.json({
      title: "Default Title",
      description: "Default description",
    });
  }

  return NextResponse.json(seo);
}

// ✅ CREATE
export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const existing = await Seo.findOne({ path: body.path });

  if (existing) {
    return NextResponse.json(
      { message: "SEO already exists for this path" },
      { status: 400 },
    );
  }

  const seo = await Seo.create(body);

  return NextResponse.json(seo);
}

// ✅ UPDATE
export async function PUT(req) {
  await connectDB();

  const body = await req.json();

  const updated = await Seo.findOneAndUpdate({ path: body.path }, body, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "ID is required" },
      { status: 400 }
    );
  }

  const deleted = await Seo.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { message: "SEO not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "SEO deleted successfully",
  });
}
