import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import fs from "fs";
import path from "path";

// ================= GET PROFILE =================
export async function GET(req) {
  try {
    const auth = await verifyAuth(req);

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        {
          status: 401,
        },
      );
    }

    const user = auth.user;

    return NextResponse.json(
      {
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile || "",
          address: user.address || "",
          image:
            user.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name,
            )}&background=random&color=fff`,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid token",
      },
      {
        status: 401,
      },
    );
  }
}

// ================= UPDATE PROFILE =================
export async function POST(req) {
  try {
    const auth = await verifyAuth(req);

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        {
          status: 401,
        },
      );
    }

    const user = auth.user;

    // Form Data
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const address = formData.get("address");
    const image = formData.get("image");

    // Update Fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.address = address || user.address;

    // Upload Image
    if (image && typeof image !== "string") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload Folder
      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // File Name
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);

      // Save File
      fs.writeFileSync(filePath, buffer);

      // Save Path
      user.image = `/uploads/${fileName}`;
    }

    // Save User
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          address: user.address,
          image: user.image,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
