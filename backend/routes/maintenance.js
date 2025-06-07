const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// For now, return an empty array or mock data
router.get("/", auth, async (req, res) => {
  // TODO: Replace with real DB query
  res.json([]);
});

module.exports = router;
