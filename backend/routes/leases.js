const express = require("express");
const router = express.Router();
const Lease = require("../models/lease");

// GET /api/leases - list all leases
router.get("/", async (req, res) => {
  try {
    const leases = await Lease.find()
      .populate("unit", "code number name")
      .populate("tenant", "name email status");
    res.json(leases);
  } catch (error) {
    console.error("Error fetching leases:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/expiring-soon", async (req, res) => {
  try {
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const leases = await Lease.find({
      endDate: { $gte: today, $lte: next30Days },
    })
      .populate("unit", "code number name")
      .populate("tenant", "name email");

    res.json(leases);
  } catch (error) {
    console.error("Error fetching expiring leases:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/leases/:id - get single lease
router.get("/:id", async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id)
      .populate("unit", "code number name")
      .populate("tenant", "name email");
    if (!lease) return res.status(404).json({ message: "Lease not found" });
    res.json(lease);
  } catch (error) {
    console.error("Error fetching lease:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/leases - create lease
router.post("/", async (req, res) => {
  try {
    const { unit, tenant, startDate, endDate, rentAmount, status } = req.body;
    // Check that the unit is vacant
    const Unit = require("../models/unit");
    const Tenant = require("../models/tenant");
    const foundUnit = await Unit.findById(unit);
    if (!foundUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    if (foundUnit.status === "occupied") {
      return res.status(400).json({ message: "Unit is already occupied" });
    }
    // Create the lease
    const newLease = new Lease({
      unit,
      tenant,
      startDate,
      endDate,
      rentAmount,
      status,
    });
    await newLease.save();
    // Mark the unit as occupied
    foundUnit.status = "occupied";
    await foundUnit.save();
    // Set tenant status to active
    await Tenant.findByIdAndUpdate(tenant, { status: "active" });
    res.status(201).json(newLease);
  } catch (error) {
    console.error("Error creating lease:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/leases/:id - update lease
router.put("/:id", async (req, res) => {
  try {
    const lease = await Lease.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lease) return res.status(404).json({ message: "Lease not found" });
    res.json(lease);
  } catch (error) {
    console.error("Error updating lease:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/leases/:id - delete lease
router.delete("/:id", async (req, res) => {
  try {
    const lease = await Lease.findByIdAndDelete(req.params.id);
    if (!lease) return res.status(404).json({ message: "Lease not found" });
    res.json({ message: "Lease deleted" });
  } catch (error) {
    console.error("Error deleting lease:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//return the leases that will expire in 30 days

module.exports = router;
