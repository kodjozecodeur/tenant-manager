import express from "express";
import { seedDemoData } from "../seed.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Seed demo data
// @route   POST /api/seed
// @access  Private/Admin
router.post("/", auth, async (req, res) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  try {
    const result = await seedDemoData();
    if (result.success) {
      res.json({ message: "Demo data seeded successfully!" });
    } else {
      res.status(500).json({ message: "Error seeding data", error: result.error });
    }
  } catch (error) {
    console.error("Error in seed route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;