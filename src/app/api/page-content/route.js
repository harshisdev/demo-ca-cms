import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import { NextResponse } from "next/server";
import Location from "@/models/Location";

const getAllLocationSlugs = (locations) => {
  const slugs = [];

  locations.forEach((loc) => {
    // parent
    slugs.push(loc.slug);

    // children
    if (loc.children?.length) {
      loc.children.forEach((child) => {
        slugs.push(child.slug);
      });
    }
  });

  return slugs;
};

// ✅ GET
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  // get all locations
  const locations = await Location.find().select(
    "slug children.slug"
  );

  const validSlugs = getAllLocationSlugs(locations);

  // ✅ GET ALL
  if (!path) {
    const all = await PageContent.find({
      path: { $in: validSlugs },
    }).sort({ createdAt: -1 });

    return NextResponse.json(all);
  }

  // ✅ INVALID PATH
  if (!validSlugs.includes(path)) {
    return NextResponse.json({});
  }

  // ✅ SINGLE
  const page = await PageContent.findOne({ path });

  return NextResponse.json(page || {});
}

// ✅ CREATE
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();

    // validate location
    const locations = await Location.find().select(
      "slug children.slug"
    );

    const validSlugs = getAllLocationSlugs(locations);

    if (!validSlugs.includes(body.path)) {
      return NextResponse.json(
        { message: "Invalid location path" },
        { status: 400 }
      );
    }

    // duplicate check
    const existing = await PageContent.findOne({
      path: body.path,
    });

    if (existing) {
      return NextResponse.json(
        { message: "Content already exists" },
        { status: 400 }
      );
    }

    const created = await PageContent.create({
      ...body,
      content: body.content || [],
    });

    return NextResponse.json(created);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Create failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ✅ UPDATE
export async function PUT(req) {
  await connectDB();

  try {
    const body = await req.json();

    const updated = await PageContent.findOneAndUpdate(
      { path: body.path },
      {
        ...body,
        content: body.content || [],
      },
      {
        new: true,
      }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Update failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ✅ DELETE
export async function DELETE(req) {
  await connectDB();

  try {
    const { id } = await req.json();

    const deleted = await PageContent.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Deleted successfully",
      deleted,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Delete failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}