const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: false,
    },
    code: {
      type: String,
      required: true,
      // Unique per property (compound index set below)
    },
    unitName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    size: {
      type: Number,
    },
    rent: {
      type: Number,
      required: true,
    },
    leaseTerms: {
      type: String,
    },
    photos: [
      {
        type: String,
      },
    ],
    status: { type: String, enum: ["vacant", "occupied"], default: "vacant" },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
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

unitSchema.index({ property: 1, code: 1 }, { unique: true });

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
