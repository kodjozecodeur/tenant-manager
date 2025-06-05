const express = require("express");
const Unit = require("../models/unit");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

//create unit
router.post("/", auth, async (req, res) => {
  const {
    property,
    unitName,
    description,
    size,
    rent,
    leaseTerms,
    photos,
    status,
    tenant,
  } = req.body;

  try {
    const newUnit = new Unit({
      property,
      unitName,
      description,
      size,
      rent,
      leaseTerms,
      photos,
      status,
      tenant,
      createdBy: req.user._id,
    });
    const savedUnit = await newUnit.save();
    res.status(201).json(savedUnit);
  } catch (error) {
    console.error("Error creating unit:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//get all units
router.get("/", auth, async (req, res) => {
  try {
    const units = await Unit.find().populate("createdBy", "name email");
    res.status(200).json(units);
  } catch (error) {
    console.error("Error fetching units:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//get unit by id
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const unit = await Unit.findById(id).populate("createdBy", "name email");
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    res.status(200).json(unit);
  } catch (error) {
    console.error("Error fetching unit:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//update unit
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updateFields = {};
  // Only add fields that are present in the request body
  [
    "property",
    "unitName",
    "description",
    "size",
    "rent",
    "leaseTerms",
    "photos",
    "status",
    "tenant",
  ].forEach((field) => {
    if (req.body[field] !== undefined) updateFields[field] = req.body[field];
  });

  try {
    const updatedUnit = await Unit.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!updatedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    res.status(200).json(updatedUnit);
  } catch (error) {
    console.error("Error updating unit:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});
//delete unit
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUnit = await Unit.findByIdAndDelete(id);
    if (!deletedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    console.error("Error deleting unit:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
