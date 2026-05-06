import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String, // better than Number
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      default: "admin",
    },

    sessionId: {
      type: String,
      default: null,
    },

    lastLogin: {
      type: Date,
    },

    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);
