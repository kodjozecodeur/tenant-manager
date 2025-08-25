import express from "express";
import { seedDemoData } from "../seed.js";
import auth from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

// @desc    Seed demo data
// @route   POST /api/seed
// @access  Private/Admin
router.post("/", auth, requireAdmin, async (req, res) => {
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