import connectDB from "@/lib/mongodb";
import Location from "@/models/Location";
import { NextResponse } from "next/server";
import Seo from "@/models/Seo";

// ================= GET =================
export async function GET() {
  try {
    await connectDB();

    const locations = await Location.find()
      .populate("parent")
      .sort({ createdAt: -1 })
      .lean();

    // 📌 Get all cities
    const cities = locations.filter((item) => item.type === "city");

    // 📌 Create nested structure
    const data = cities.map((city) => ({
      _id: city._id,
      name: city.name,
      slug: city.slug,
      type: city.type,
      createdAt: city.createdAt,
      updatedAt: city.updatedAt,

      children: locations
        .filter(
          (item) =>
            item.type === "area" &&
            item.parent?._id.toString() === city._id.toString(),
        )
        .map((area) => ({
          _id: area._id,
          name: area.name,
          slug: area.slug,
          type: area.type,
          parent: {
            _id: city._id,
            name: city.name,
            slug: city.slug,
          },
          createdAt: area.createdAt,
          updatedAt: area.updatedAt,
        })),
    }));

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ================= CREATE =================
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // 🔥 VALIDATION
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 },
      );
    }

    // 🔥 SLUG UNIQUE CHECK
    const exists = await Location.findOne({ slug: body.slug });
    if (exists) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 },
      );
    }

    // 🔥 FIX PARENT
    if (!body.parent || body.type === "city") {
      body.parent = null;
    }

    const data = await Location.create(body);

    return NextResponse.json(data);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ================= UPDATE =================
export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // 🔥 FIX PARENT
    if (!rest.parent || rest.type === "city") {
      rest.parent = null;
    }

    // 🔥 SLUG DUPLICATE CHECK (exclude current)
    if (rest.slug) {
      const exists = await Location.findOne({
        slug: rest.slug,
        _id: { $ne: id },
      });

      if (exists) {
        return NextResponse.json(
          { error: "Slug already exists" },
          { status: 400 },
        );
      }
    }

    const updated = await Location.findByIdAndUpdate(id, rest, {
      new: true,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ================= DELETE =================

export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const location = await Location.findById(id);

    if (!location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 },
      );
    }

    // delete location
    await Location.findByIdAndDelete(id);

    // delete related SEO
    await Seo.deleteMany({ path: location.slug });

    return NextResponse.json({
      success: true,
      message: "Location & related SEO deleted",
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
