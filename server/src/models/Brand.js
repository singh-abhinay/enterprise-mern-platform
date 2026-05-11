import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
    },

    website: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

brandSchema.pre("save", function () {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
});

brandSchema.index({ isActive: 1 });
brandSchema.index({ createdAt: -1 });

export default mongoose.model("Brand", brandSchema);
