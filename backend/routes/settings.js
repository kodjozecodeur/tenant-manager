const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Settings = require("../models/settings");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// GET /api/settings - Get current user settings
router.get("/", authMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.userId });

    // If no settings exist, create default settings
    if (!settings) {
      settings = new Settings({ userId: req.userId });
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/settings - Update user settings
router.put("/", authMiddleware, async (req, res) => {
  try {
    const {
      organizationName,
      organizationLogo,
      defaultCurrency,
      language,
      timezone,
      notifications,
      security,
      theme,
      dateFormat,
      timeFormat,
    } = req.body;

    let settings = await Settings.findOne({ userId: req.userId });

    // If no settings exist, create new settings
    if (!settings) {
      settings = new Settings({ userId: req.userId });
    }

    // Update general settings
    if (organizationName !== undefined)
      settings.organizationName = organizationName;
    if (organizationLogo !== undefined)
      settings.organizationLogo = organizationLogo;
    if (defaultCurrency !== undefined)
      settings.defaultCurrency = defaultCurrency;
    if (language !== undefined) settings.language = language;
    if (timezone !== undefined) settings.timezone = timezone;

    // Update notification settings
    if (notifications) {
      if (notifications.email) {
        settings.notifications.email = {
          ...settings.notifications.email,
          ...notifications.email,
        };
      }
      if (notifications.sms) {
        settings.notifications.sms = {
          ...settings.notifications.sms,
          ...notifications.sms,
        };
      }
      if (notifications.push) {
        settings.notifications.push = {
          ...settings.notifications.push,
          ...notifications.push,
        };
      }
    }

    // Update security settings
    if (security) {
      settings.security = { ...settings.security, ...security };
    }

    // Update UI preferences
    if (theme !== undefined) settings.theme = theme;
    if (dateFormat !== undefined) settings.dateFormat = dateFormat;
    if (timeFormat !== undefined) settings.timeFormat = timeFormat;

    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/settings/password - Update password with current password verification
router.put("/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "All password fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword; // Will be hashed by pre-save middleware
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
