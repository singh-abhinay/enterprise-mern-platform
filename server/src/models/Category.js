import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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
      required: true,
    },

    image: {
      type: String,
    },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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

categorySchema.pre("save", async function () {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/ /g, "-");
  }
});

export default mongoose.model("Category", categorySchema);
