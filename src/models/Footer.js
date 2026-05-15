import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema(
  {
    // ADD THIS
    logo: String,

    logoText: String,
    title: String,
    description: String,
    email: String,
    location: String,

    quickLinks: [
      {
        label: String,
        url: String,
      },
    ],

    topCities: [
      {
        label: String,
        url: String,
      },
    ],

    services: [
      {
        label: String,
        url: String,
      },
    ],

    policies: [
      {
        label: String,
        url: String,
      },
    ],

    copyright: String,
    developedBy: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Footer || mongoose.model("Footer", FooterSchema);
