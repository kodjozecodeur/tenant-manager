const express = require("express");
const Property = require("../models/property");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//create property
router.post(
  "/",
  auth,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("photos").isArray().withMessage("Photos must be an array"),
  ],
  async (req, res) => {
    const { name, address, description, type, photos } = req.body;
    // Validate required fields
    console.log("req.user:", req.user);
    console.log("req.user.id:", req.user.id);
    console.log("req.user._id:", req.user._id);

    try {
      //check if user is authorized to create a property
      // Check if user exists
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const newProperty = new Property({
        name,
        address,
        description,
        type,
        photos,
        createdBy: req.user._id,
      });
      const savedProperty = await newProperty.save();
      res.status(201).json(savedProperty);
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
//get all properties
router.get("/", auth, async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("createdBy", "name email")
      .lean();
    // For each property, fetch its units
    const Unit = require("../models/unit");
    const propertiesWithUnits = await Promise.all(
      properties.map(async (property) => {
        const units = await Unit.find({ property: property._id });
        return { ...property, units };
      })
    );
    res.status(200).json(propertiesWithUnits);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//get property by id
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id).populate(
      "createdBy",
      "name email"
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//update property
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { name, address, description, type, photos } = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { name, address, description, type, photos },
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//delete property
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
