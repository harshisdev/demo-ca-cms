import mongoose from "mongoose";

const SeoSchema = new mongoose.Schema(
  {
    path: { type: String, unique: true },

    title: String,
    description: String,
    keywords: [String],
    canonical: String,

    robots: {
      index: String,
      follow: String,
    },

    openGraph: {
      title: String,
      description: String,
      url: String,
      type: String,
      site_name: String,
      locale: String,
      images: [
        {
          url: String,
          width: Number,
          height: Number,
          alt: String,
        },
      ],
    },

    twitter: {
      card: String,
      title: String,
      description: String,
      image: String,
    },

    geo: {
      region: String,
      placename: String,
      position: String,
      ICBM: String,
    },

    language: String,
    author: String,
  },
  { timestamps: true },
);

export default mongoose.models.Seo || mongoose.model("Seo", SeoSchema);
