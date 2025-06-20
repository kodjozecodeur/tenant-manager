const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");
const MaintenanceRequest = require("../models/maintenanceRequest");

// Create a maintenance request
router.post(
  "/",
  auth,
  [
    body("tenant").notEmpty().withMessage("Tenant ID is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("issueType")
      .notEmpty()
      .withMessage("Issue type is required")
      .isIn(["Plumbing", "Electrical", "Heating", "Appliances", "Other"])
      .withMessage("Invalid issue type"),
    body("status")
      .optional()
      .isIn(["Pending", "In Progress", "Completed"])
      .withMessage("Invalid status"),
    body("priority")
      .optional()
      .isIn(["Low", "Medium", "High", "Critical"])
      .withMessage("Invalid priority"),
    body("photoUrl").optional().isURL().withMessage("Invalid photo URL"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      tenant,
      unit,
      property,
      description,
      status,
      priority,
      notes,
      issueType,
      photoUrl,
    } = req.body;
    try {
      const request = new MaintenanceRequest({
        tenant,
        unit,
        property,
        description,
        issueType,
        photoUrl,
        status,
        priority,
        notes,
      });
      const saved = await request.save();
      res.status(201).json(saved);
    } catch (error) {
      console.error("Error creating maintenance request:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all maintenance requests
router.get("/", auth, async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate("tenant", "name")
      .populate("unit", "unitName")
      .populate("property", "name");
    res.json(requests);
  } catch (error) {
    console.error("Error fetching maintenance requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a maintenance request by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id)
      .populate("tenant", "name")
      .populate("unit", "unitName")
      .populate("property", "name");
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (error) {
    console.error("Error fetching maintenance request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a maintenance request
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Request not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating maintenance request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a maintenance request
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await MaintenanceRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Maintenance request deleted" });
  } catch (error) {
    console.error("Error deleting maintenance request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
