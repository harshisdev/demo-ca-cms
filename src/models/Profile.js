import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
});

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const WorkingHoursSchema = new mongoose.Schema({
  monday: String,
  tuesday: String,
  wednesday: String,
  thursday: String,
  friday: String,
  saturday: String,
  sunday: String,
});

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },

    designation: String,
    specialization: String,
    qualification: String,
    membership: String,

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },

    areas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
      },
    ],

    rating: Number,
    experience: String,
    clients: String,
    fee: Number,

    services: [String],
    expertise: [String],
    certifications: [String],
    highlights: [String],
    languages: [String],

    about: String,
    phone: String,
    email: String,
    address: String,

    availability: String,

    workingHours: WorkingHoursSchema,

    reviews: [ReviewSchema],
    faq: [FAQSchema],

    mapQuery: String,

    profileimage: String,

    social: {
      linkedin: String,
      twitter: String,
      facebook: String,
    },

    profileshow: Boolean,
    profileshowallpage: Boolean,
  },
  { timestamps: true },
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
