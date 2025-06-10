const express = require("express");
const router = express.Router();

const Property = require("../models/property");
const Unit = require("../models/unit");
const Tenant = require("../models/tenant");
const Payment = require("../models/payment");
const Lease = require("../models/lease");
const MaintenanceRequest = require("../models/maintenanceRequest"); // 👈 Don't forget this

// GET /api/dashboard-stats
router.get("/dashboard-stats", async (req, res) => {
  try {
    // --- Basic stats
    const [totalProperties, totalUnits, totalTenants, totalPayments] =
      await Promise.all([
        Property.countDocuments(),
        Unit.countDocuments(),
        Tenant.countDocuments(),
        Payment.countDocuments(),
      ]);

    // --- Occupancy data
    const occupiedUnits = await Unit.countDocuments({ status: "occupied" });
    const vacantUnits = totalUnits - occupiedUnits;

    const occupancyData = [
      { name: "Occupied", value: occupiedUnits, color: "#34D399" },
      { name: "Vacant", value: vacantUnits, color: "#F87171" },
    ];

    // --- Lease expiration chart (next 6 months)
    const today = new Date();
    const future = new Date();
    future.setMonth(future.getMonth() + 6);

    const leases = await Lease.find({
      endDate: { $gte: today, $lte: future },
    });

    const leaseExpirations = {};

    leases.forEach((lease) => {
      const month = new Date(lease.endDate).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      leaseExpirations[month] = (leaseExpirations[month] || 0) + 1;
    });

    const leaseChartData = Object.entries(leaseExpirations).map(
      ([month, count]) => ({
        month,
        count,
      })
    );
    // --- Recent Rent Payments
    const recentPayments = await Payment.find()
      .sort({ date: -1 })
      .limit(5)
      .populate("tenant", "name");

    // --- Upcoming Lease Expirations (next 30 days)
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    const upcomingLeases = await Lease.find({
      endDate: { $gte: today, $lte: thirtyDaysLater },
    })
      .populate("tenant", "name")
      .populate("unit", "name");

    // --- Maintenance requests
    const [totalRequests, pendingRequests] = await Promise.all([
      MaintenanceRequest.countDocuments(),
      MaintenanceRequest.countDocuments({ status: "Pending" }),
    ]);

    res.json({
      totalProperties,
      totalUnits,
      totalTenants,
      totalPayments,
      totalRequests,
      pendingRequests,
      occupancyData,
      leaseChartData,
      recentPayments,
      upcomingLeases,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
