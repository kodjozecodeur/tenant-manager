import express from "express";
import { body, validationResult } from "express-validator";
import Unit from "../models/unit.js";
import Tenant from "../models/tenant.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Move In Route
router.post(
  "/units/:unitId/move-in",
  authMiddleware,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("contact").notEmpty().withMessage("Contact is required"),
    body("lease").notEmpty().withMessage("Lease details are required"),
    body("upfrontPayment")
      .isNumeric()
      .withMessage("Upfront payment must be a number"),
  ],
  async (req, res) => {
    const { unitId } = req.params;
    const { name, contact, lease, upfrontPayment } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find the unit to be assigned
      const unit = await Unit.findById(unitId);
      if (!unit) return res.status(404).json({ message: "Unit not found" });

      if (unit.status === "occupied") {
        return res.status(400).json({ message: "Unit is already occupied" });
      }

      // Create new tenant assigned to this unit & property (unit.property)
      const newTenant = new Tenant({
        name,
        contact,
        lease,
        upfrontPayment,
        unit: unit._id,
        property: unit.property,
      });

      const savedTenant = await newTenant.save();

      // Update unit tenant reference and status
      unit.tenant = savedTenant._id;
      unit.status = "occupied";
      await unit.save();

      res
        .status(201)
        .json({ message: "Tenant moved in", tenant: savedTenant, unit });
    } catch (error) {
      console.error("Error during move-in:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Move Out Route
router.patch("/units/:unitId/move-out", authMiddleware, async (req, res) => {
  const { unitId } = req.params;
  
  try {
    // Find the unit by id
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    
    // Find the tenant associated with the unit
    if (!unit.tenant) {
      return res
        .status(404)
        .json({ message: "No tenant associated with this unit" });
    }
    
    const tenant = await Tenant.findById(unit.tenant);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    
    // Update tenant lease info
    tenant.lease.endDate = new Date();
    tenant.lease.status = "ended";
    await tenant.save();
    
    // Update unit info
    unit.tenant = null;
    unit.status = "available";
    await unit.save();
    
    res
      .status(200)
      .json({ message: "Tenant moved out successfully", tenant, unit });
  } catch (error) {
    console.error("Error moving out tenant:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;