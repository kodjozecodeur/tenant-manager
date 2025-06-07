const express = require("express");
const Tenant = require("../models/tenant");
const auth = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//create tenant,
router.post(
  "/",
  auth,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("contact").notEmpty().withMessage("Contact is required"),
    body("property").notEmpty().withMessage("Property ID is required"),
    body("unit").notEmpty().withMessage("Unit ID is required"),
    body("lease").notEmpty().withMessage("Lease is required"),
    body("upfrontPayment")
      .isNumeric()
      .withMessage("Upfront payment must be a number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, contact, property, lease, unit, upfrontPayment } = req.body;

    try {
      const newTenant = new Tenant({
        name,
        contact,
        property,
        lease,
        unit,
        upfrontPayment,
      });

      const savedTenant = await newTenant.save();
      res.status(201).json(savedTenant);
    } catch (error) {
      console.error("Error creating tenant:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
//get all tenant
router.get("/", auth, async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.status(200).json(tenants);
  } catch (error) {
    console.error("Error fetching tenants:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//get tenant by id
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const tenant = await Tenant.findById(id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json(tenant);
  } catch (error) {
    console.error("Error fetching tenant:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//update tenant
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { name, contact, property, lease, unit, upfrontPayment } = req.body;

  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      id,
      { name, contact, property, lease, unit, upfrontPayment },
      { new: true }
    );

    if (!updatedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    res.status(200).json(updatedTenant);
  } catch (error) {
    console.error("Error updating tenant:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//delete tenant
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTenant = await Tenant.findByIdAndDelete(id);
    if (!deletedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    console.error("Error deleting tenant:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
