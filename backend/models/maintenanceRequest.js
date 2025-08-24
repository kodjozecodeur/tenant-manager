// filepath: backend/models/maintenanceRequest.js
import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    description: {
      type: String,
      required: true,
    },
    issueType: {
      type: String,
      enum: ["Plumbing", "Electrical", "Heating", "Appliances", "Other"],
      required: true,
    },
    photoUrl: {
      type: String,
    },
    technician: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    reportedDate: {
      type: Date,
      default: Date.now,
    },
    resolvedDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);
export default MaintenanceRequest;
