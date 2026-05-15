import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Profile from "@/models/Profile";

// ===============================
// DB CONNECT
// ===============================
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);

    throw new Error("Database connection failed");
  }
};

// ===============================
// GET
// All Profiles OR Single Profile
// ===============================
export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    // SINGLE PROFILE
    if (id) {
      const profile = await Profile.findById(id)

      if (!profile) {
        return NextResponse.json(
          {
            success: false,
            message: "Profile not found",
          },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        profile,
      });
    }

    // ALL PROFILES
    const profiles = await Profile.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      profiles,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profiles",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// ===============================
// POST
// CREATE PROFILE
// ===============================
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();

    // ===============================
    // REQUIRED FIELD VALIDATION
    // ===============================
    const requiredFields = {
      name: "Name",
      slug: "Slug",
      designation: "Designation",
      specialization: "Specialization",
      qualification: "Qualification",
      city: "City",
      experience: "Experience",
      about: "About",
      mobile: "Mobile",
      email: "Email",
      address: "Address",
      image: "Profile Image",
    };

    for (const key in requiredFields) {
      if (!body[key]) {
        return NextResponse.json(
          {
            success: false,
            message: `${requiredFields[key]} is required`,
          },
          { status: 400 },
        );
      }
    }

    // ===============================
    // CHECK SLUG
    // ===============================
    const existingSlug = await Profile.findOne({
      slug: body.slug,
    });

    if (existingSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug already exists",
        },
        { status: 400 },
      );
    }

    // ===============================
    // CREATE PROFILE
    // ===============================
    const profile = await Profile.create({
      ...body,

      services: body.services || [],
      expertise: body.expertise || [],
      certifications: body.certifications || [],
      highlights: body.highlights || [],
      languages: body.languages || [],
      faq: body.faq || [],
      reviews: body.reviews || [],

      profileshow: body.profileshow !== undefined ? body.profileshow : true,

      profileshowallpage:
        body.profileshowallpage !== undefined ? body.profileshowallpage : false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Profile created successfully",
        profile,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create profile",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// ===============================
// PUT
// UPDATE PROFILE
// ===============================
export async function PUT(req) {
  await connectDB();

  try {
    const body = await req.json();

    // ===============================
    // CHECK ID
    // ===============================
    if (!body._id) {
      return NextResponse.json(
        {
          success: false,
          message: "_id is required",
        },
        { status: 400 },
      );
    }

    // ===============================
    // CHECK PROFILE EXISTS
    // ===============================
    const existingProfile = await Profile.findById(body._id);

    if (!existingProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 },
      );
    }

    // ===============================
    // CHECK SLUG DUPLICATE
    // ===============================
    if (body.slug) {
      const slugExists = await Profile.findOne({
        slug: body.slug,
        _id: { $ne: body._id },
      });

      if (slugExists) {
        return NextResponse.json(
          {
            success: false,
            message: "Slug already exists",
          },
          { status: 400 },
        );
      }
    }

    // ===============================
    // UPDATE PROFILE
    // ===============================
    const updatedProfile = await Profile.findByIdAndUpdate(
      body._id,
      {
        ...body,
      },
      {
        new: true,
        runValidators: true,
      },
    )

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// ===============================
// DELETE
// DELETE PROFILE
// ===============================
export async function DELETE(req) {
  await connectDB();

  try {
    const body = await req.json();

    const id = body.id;

    // ===============================
    // VALIDATION
    // ===============================
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 },
      );
    }

    // ===============================
    // CHECK PROFILE EXISTS
    // ===============================
    const existingProfile = await Profile.findById(id);

    if (!existingProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 },
      );
    }

    // ===============================
    // DELETE PROFILE
    // ===============================
    await Profile.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete profile",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
