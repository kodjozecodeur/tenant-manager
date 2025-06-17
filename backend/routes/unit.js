const express = require("express");
const Unit = require("../models/unit");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const { body } = require("express-validator");

// Create unit
router.post(
  "/",
  auth,
  [
    body("unitName").notEmpty().withMessage("Unit name is required"),
    body("code").notEmpty().withMessage("Unit code is required"),
    body("rent")
      .isNumeric()
      .withMessage("Rent is required and must be a number"),
    body("property").notEmpty().withMessage("Property is required"),
  ],
  async (req, res) => {
    try {
      const {
        code,
        unitName,
        description,
        size,
        rent,
        leaseTerms,
        photos,
        property,
      } = req.body;
      const newUnit = new Unit({
        code,
        unitName,
        description,
        size,
        rent,
        leaseTerms,
        photos,
        property,
        createdBy: req.user._id,
      });
      const savedUnit = await newUnit.save();
      res.status(201).json(savedUnit);
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Unit code must be unique per property." });
      }
      console.error("Error creating unit:", error);
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
      runValidators: true,
    });
    if (!updatedUnit)
      return res.status(404).json({ message: "Unit not found" });
    res.status(200).json(updatedUnit);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Unit code must be unique per property." });
    }
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
