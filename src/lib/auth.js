import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import UserProfile from "@/models/UserProfile";

export async function verifyAuth(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "No token",
      };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
        message: "Your account was logged in on another device",
      };
    }

    // Check inactivity timeout
    const now = Date.now();

    const lastActivity = new Date(user.lastActivity).getTime();

    const diffMinutes = (now - lastActivity) / 1000 / 60;

    // 15 minute idle logout
    if (diffMinutes > 15) {
      // Clear session
      user.isLoggedIn = false;
      user.sessionId = null;
      user.lastActivity = null;

      await user.save();

      return {
        success: false,
        message: "Session expired due to inactivity",
      };
    }

    // Update activity time
    user.lastActivity = new Date();

    await user.save();

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid token",
    };
  }
}
