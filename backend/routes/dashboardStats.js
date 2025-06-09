const express = require("express");
const router = express.Router();
const Property = require("../models/property");
const Tenant = require("../models/tenant");

router.get("/dashboard-stats", async (req, res) => {
  try {
    // Get total number of properties
    const totalProperties = await Property.countDocuments();

    // Get total number of tenants
    const totalTenants = await Tenant.countDocuments();

    // Get number of occupied properties
    const occupiedProperties = await Property.countDocuments({
      "units.status": "occupied",
    });

    // Get number of vacant properties
    const vacantProperties = totalProperties - occupiedProperties;

    res.json({
      totalProperties,
      totalTenants,
      occupiedProperties,
      vacantProperties,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Export the router
module.exports = router;
