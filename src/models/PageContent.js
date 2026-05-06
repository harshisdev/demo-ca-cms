import mongoose from "mongoose";

const PageContentSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      unique: true,
    },

    title: String,

    // ✅ JSON content blocks
    content: [
      {
        type: {
          type: String,
          required: true,
        },

        text: String,

        items: [String],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.PageContent ||
  mongoose.model("PageContent", PageContentSchema);