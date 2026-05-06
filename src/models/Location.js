import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      default: null,
    },

    type: {
      type: String,
      enum: ["city", "area"],
      default: "city",
      required: true,
    },
  },
  { timestamps: true },
);
LocationSchema.pre("save", function () {
  if (this.type === "city") this.parent = null;

  if (this.type === "area" && !this.parent) {
    throw new Error("Area must have a parent city");
  }
});

LocationSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();

  if (!update) return;

  if (update.type === "city") update.parent = null;

  if (update.type === "area" && !update.parent) {
    throw new Error("Area must have a parent city");
  }

  this.setUpdate(update);
});

export default mongoose.models.Location ||
  mongoose.model("Location", LocationSchema);
