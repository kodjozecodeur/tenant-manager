// filepath: backend/routes/payments.js
const express = require("express");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/authMiddleware");
const Payment = require("../models/payment");
const router = express.Router();

// Create a payment
router.post(
  "/",
  auth,
  [
    body("tenant").notEmpty().withMessage("Tenant ID is required"),
    body("amount").isNumeric().withMessage("Amount must be a number"),
    body("status")
      .optional()
      .isIn(["Paid", "Pending", "Overdue"])
      .withMessage("Invalid status"),
    body("method")
      .optional()
      .isIn(["cash", "card", "transfer", "cheque"])
      .withMessage("Invalid method"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tenant, amount, date, status, method, notes } = req.body;
    try {
      const payment = new Payment({
        tenant,
        amount,
        date,
        status,
        method,
        notes,
      });
      const saved = await payment.save();
      res.status(201).json(saved);
    } catch (error) {
      console.error("Error creating payment:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all payments
router.get("/", auth, async (req, res) => {
  try {
    const payments = await Payment.find().populate("tenant", "name");
    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//retrieve 5 most recent payments
router.get("/recent", auth, async (req, res) => {
  try {
    const payments = await Payment.find()
      .sort({ date: -1 })
      .limit(5)
      .populate("tenant", "name");
    res.json(payments);
  } catch (error) {
    console.error("Error fetching recent payments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get payment by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate(
      "tenant",
      "name"
    );
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update payment
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Payment not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete payment
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
