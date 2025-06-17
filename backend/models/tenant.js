const mongoose = require("mongoose");
const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    property: { type: String },

    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: false, // made optional
    },
    lease: { type: String },
    upfrontPayment: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", tenantSchema);
module.exports = Tenant;
