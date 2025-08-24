import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true, // Made required since it's essential
    },
    unitName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    size: {
      type: Number,
      min: 0,
      max: 10000,
    },
    rent: {
      type: Number,
      required: true,
      min: 0,
    },
    leaseTerms: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    photos: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return !v || v.length <= 5; // Max 5 photos
          },
          message: "Maximum 5 photos allowed",
        },
      },
    ],
    status: {
      type: String,
      enum: ["vacant", "occupied", "maintenance"],
      default: "vacant",
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for unique unit names within the same property
unitSchema.index({ unitName: 1, property: 1 }, { unique: true });

// Add virtual for formatted rent
unitSchema.virtual("formattedRent").get(function () {
  return `$${this.rent.toLocaleString()}`;
});

// Add method to check if unit is available for lease
unitSchema.methods.isAvailableForLease = function () {
  return this.status === "vacant" && !this.tenant;
};

export default mongoose.model("Unit", unitSchema);

