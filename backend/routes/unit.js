const express = require("express");
const Unit = require("../models/unit");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create unit
router.post(
  "/",
  auth,
  [
    body("unitName")
      .trim()
      .notEmpty()
      .withMessage("Unit name is required")
      .isLength({ min: 1, max: 100 })
      .withMessage("Unit name must be between 1 and 100 characters"),
    body("rent")
      .isNumeric({ min: 0 })
      .withMessage("Rent must be a positive number")
      .custom((value) => {
        if (value <= 0) {
          throw new Error("Rent must be greater than 0");
        }
        return true;
      }),
    body("property")
      .notEmpty()
      .withMessage("Property is required")
      .isMongoId()
      .withMessage("Invalid property ID"),
    body("size")
      .optional()
      .isNumeric({ min: 0 })
      .withMessage("Size must be a positive number"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),
    body("leaseTerms")
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage("Lease terms cannot exceed 200 characters"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const {
        unitName,
        description,
        size,
        rent,
        leaseTerms,
        photos,
        property,
      } = req.body;

      // Check if property exists
      const Property = require("../models/property");
      const propertyExists = await Property.findById(property);
      if (!propertyExists) {
        return res.status(404).json({ message: "Property not found" });
      }

      // Check for duplicate unit name within the same property
      const existingUnit = await Unit.findOne({ unitName, property });
      if (existingUnit) {
        return res.status(400).json({
          message:
            "A unit with this name already exists in the selected property",
        });
      }

      const newUnit = new Unit({
        unitName: unitName.trim(),
        description: description?.trim(),
        size: size ? Number(size) : undefined,
        rent: Number(rent),
        leaseTerms: leaseTerms?.trim(),
        photos: photos || [],
        property,
        status: "vacant", // Explicitly set default status
        createdBy: req.user._id,
      });

      const savedUnit = await newUnit.save();

      // Populate the property info before sending response
      const populatedUnit = await Unit.findById(savedUnit._id).populate(
        "property",
        "name address"
      );

      res.status(201).json(populatedUnit);
    } catch (error) {
      console.error("Error creating unit:", error);
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation error",
          errors: Object.values(error.errors).map((err) => err.message),
        });
      }
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all units
router.get("/", auth, async (req, res) => {
  try {
    const units = await Unit.find().populate("property", "name address");
    res.status(200).json(units);
  } catch (error) {
    console.error("Error fetching units:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get unit by id
router.get("/:id", auth, async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id).populate(
      "property",
      "name address"
    );
    if (!unit) return res.status(404).json({ message: "Unit not found" });
    res.status(200).json(unit);
  } catch (error) {
    console.error("Error fetching unit:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update unit
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUnit)
      return res.status(404).json({ message: "Unit not found" });
    res.status(200).json(updatedUnit);
  } catch (error) {
    console.error("Error updating unit:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete unit
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedUnit = await Unit.findByIdAndDelete(req.params.id);
    if (!deletedUnit)
      return res.status(404).json({ message: "Unit not found" });
    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    console.error("Error deleting unit:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
