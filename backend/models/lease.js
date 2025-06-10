const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema(
  {
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    rentAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "terminated", "pending"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lease", leaseSchema);
