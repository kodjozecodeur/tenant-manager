import mongoose from "mongoose";

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
    lease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lease",
      required: false,
    },
    upfrontPayment: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", tenantSchema);
