const mongoose = require("mongoose");
const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String },
    property: { type: String },
    lease: { type: String },
    upfrontPayment: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", tenantSchema);
module.exports = Tenant;
