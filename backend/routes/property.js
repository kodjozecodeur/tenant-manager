import express from "express";
import { body, validationResult } from "express-validator";
import Property from "../models/property.js";
import Unit from "../models/unit.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create property
router.post(
  "/",
  authMiddleware,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("photos").isArray().withMessage("Photos must be an array"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, description, type, photos } = req.body;
    
    // Validate required fields
    console.log("req.user:", req.user);
    console.log("req.user.id:", req.user.id);
    console.log("req.user._id:", req.user._id);

    try {
      // Check if user is authorized to create a property
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

// Get all properties
router.get("/", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("createdBy", "name email")
      .lean();
    
    // For each property, fetch its units
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

// Get property by id
router.get("/:id", authMiddleware, async (req, res) => {
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

// Update property
router.put("/:id", authMiddleware, async (req, res) => {
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

// Delete property
router.delete("/:id", authMiddleware, async (req, res) => {
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

export default router;