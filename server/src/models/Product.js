import mongoose from "mongoose";
import slugify from "slugify";
import "./Category.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

    shortDescription: {
      type: String,
      maxlength: 300,
    },

    brand: {
      type: String,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },

    costPrice: {
      type: Number,
    },

    currency: {
      type: String,
      default: "INR",
    },

    tax: {
      type: Number,
    },

    sku: {
      type: String,
      unique: true,
      sparse: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    minStock: {
      type: Number,
      default: 0,
    },

    trackStock: {
      type: Boolean,
      default: true,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    images: [
      {
        url: String,
        alt: String,
      },
    ],

    thumbnail: {
      type: String,
    },

    videoUrl: {
      type: String,
    },

    variants: [
      {
        name: String,
        options: [String],
      },
    ],

    variantProducts: [
      {
        sku: String,
        price: Number,
        stock: Number,
        attributes: Object,
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    weight: Number,

    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },

    shippingCost: Number,

    freeShipping: {
      type: Boolean,
      default: false,
    },

    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],

    attributes: {
      type: Map,
      of: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
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

productSchema.pre("save", async function () {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  if (!this.metaTitle && this.name) {
    this.metaTitle = this.name;
  }

  if (!this.metaDescription) {
    this.metaDescription =
      this.shortDescription ||
      (this.description ? this.description.substring(0, 160) : "");
  }

  this.inStock = this.stock > 0;
});

productSchema.index({ category: 1 });
productSchema.index({ isActive: 1, isDeleted: 1 });
productSchema.index({ createdAt: -1 });

export default mongoose.model("Product", productSchema);
