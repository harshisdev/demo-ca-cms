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

    image: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);
