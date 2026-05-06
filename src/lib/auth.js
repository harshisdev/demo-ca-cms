import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

export async function verifyAuth(req) {
  try {
    await connectDB();

      const token = req.cookies.get("token")?.value;
      console.log("Token in verifyAuth:", token); // Debugging log

    if (!token) {
      return {
        success: false,
        message: "No token",
      };
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await UserProfile.findById(decoded.id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Multiple login detection
    if (user.sessionId !== decoded.sessionId) {
      return {
        success: false,
        message: "Another login detected",
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid or expired token",
    };
  }
}
