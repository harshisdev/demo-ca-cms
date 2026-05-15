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

    // Check inactivity timeout first
    const now = Date.now();

    const lastActivity = new Date(user.lastActivity).getTime();

    const diffMinutes = (now - lastActivity) / 1000 / 60;

    // Session expired
    if (diffMinutes > 60) {
      // Clear session
      user.sessionId = null;
      user.isLoggedIn = false;
      user.lastActivity = null;

      await user.save();

      return {
        success: false,
        message: "Session expired due to inactivity",
      };
    }

    // Multiple login detection
    if (user.sessionId !== decoded.sessionId) {
      return {
        success: false,
        message: "Your account was logged in on another device",
      };
    }

    // Logout after 60 minutes inactivity
    if (diffMinutes > 60) {
      return {
        success: false,
        message: "Session expired due to inactivity",
      };
    }

    // Update activity every 60 minutes only
    if (diffMinutes > 60) {
      user.lastActivity = new Date();
      await user.save();
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    try {
      const token = req.cookies.get("token")?.value;
      if (token) {
        const decoded = jwt.decode(token);
        if (decoded?.id) {
          await connectDB();
          const user = await UserProfile.findById(decoded.id);
          if (user) {
            user.sessionId = null;
            user.isLoggedIn = false;
            user.lastActivity = null;
            await user.save();
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    return { success: false, message: "Invalid token" };
  }
}
