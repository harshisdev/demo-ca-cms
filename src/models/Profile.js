import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },

  answer: {
    type: String,
    required: true,
    trim: true,
  },
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
    // BASIC
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

    designation: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    membership: String,

    // LOCATION
    city: {
      type: String,
      required: true,
    },

    area: {
      type: String,
    },

    address: {
      type: String,
      required: true,
    },

    mapQuery: String,

    // BUSINESS
    rating: {
      type: Number,
      default: 5,
    },

    experience: {
      type: String,
      required: true,
    },

    clients: String,

    fee: {
      type: Number,
      default: 0,
    },

    availability: String,

    // SERVICES
    services: {
      type: [String],
      default: [],
    },

    expertise: {
      type: [String],
      default: [],
    },

    certifications: {
      type: [String],
      default: [],
    },

    highlights: {
      type: [String],
      default: [],
    },

    languages: {
      type: [String],
      default: [],
    },

    // ABOUT
    about: {
      type: String,
      required: true,
    },

    // CONTACT
    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // IMAGE
    profileimage: {
      type: String,
      required: true,
    },

    // WORKING HOURS
    workingHours: {
      type: WorkingHoursSchema,
      default: {},
    },

    // REVIEWS
    reviews: {
      type: [ReviewSchema],
      default: [],
    },

    // FAQ
    faq: {
      type: [FAQSchema],
      default: [],
    },

    // SOCIAL
    social: {
      linkedin: String,
      twitter: String,
      facebook: String,
    },

    // SETTINGS
    profileshow: {
      type: Boolean,
      default: true,
    },

    profileshowallpage: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
