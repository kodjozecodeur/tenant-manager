const mongoose = require("mongoose");

// Create settings schema
const settingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // General Settings
    organizationName: {
      type: String,
      default: "My Property Management",
    },
    organizationLogo: String,
    defaultCurrency: {
      type: String,
      default: "USD",
      enum: ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "CNY", "INR"],
    },
    language: {
      type: String,
      default: "en",
      enum: ["en", "es", "fr", "de", "pt", "it", "zh", "ja", "ko"],
    },
    timezone: {
      type: String,
      default: "America/New_York",
    },

    // Notification Settings
    notifications: {
      email: {
        leaseExpiration: { type: Boolean, default: true },
        paymentDue: { type: Boolean, default: true },
        maintenanceUpdates: { type: Boolean, default: true },
        systemAlerts: { type: Boolean, default: true },
        newTenantRegistration: { type: Boolean, default: true },
      },
      sms: {
        leaseExpiration: { type: Boolean, default: false },
        paymentDue: { type: Boolean, default: false },
        maintenanceUpdates: { type: Boolean, default: false },
        systemAlerts: { type: Boolean, default: false },
        newTenantRegistration: { type: Boolean, default: false },
      },
      push: {
        leaseExpiration: { type: Boolean, default: true },
        paymentDue: { type: Boolean, default: true },
        maintenanceUpdates: { type: Boolean, default: true },
        systemAlerts: { type: Boolean, default: true },
        newTenantRegistration: { type: Boolean, default: true },
      },
    },

    // Security Settings
    security: {
      twoFactorEnabled: { type: Boolean, default: false },
      sessionTimeout: { type: Number, default: 60 }, // in minutes
      passwordChangeRequired: { type: Boolean, default: false },
      loginAlerts: { type: Boolean, default: true },
    },

    // UI Preferences
    theme: {
      type: String,
      default: "light",
      enum: ["light", "dark", "auto"],
    },
    dateFormat: {
      type: String,
      default: "MM/DD/YYYY",
      enum: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"],
    },
    timeFormat: {
      type: String,
      default: "12h",
      enum: ["12h", "24h"],
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);
module.exports = Settings;
