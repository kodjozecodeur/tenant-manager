// =========================
// Imports and Config
// =========================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());

// =========================
// Root Route
// =========================
app.get("/", (req, res) => res.send("API Running"));

// =========================
// Seed Admin User Utility
// =========================
const seedAdminUser = require("./utils/autoSeedAdmin");

// =========================
// Auth Routes
// =========================
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// =========================
// Auth Middleware & Protected Route
// =========================
const auth = require("./middleware/authMiddleware");
app.get("/api/protected", auth, (req, res) => {
  res.send(`Hello user ${req.user.id}, you are authenticated`);
});

// =========================
// Tenant Routes
// =========================
const tenantRoutes = require("./routes/tenants");
app.use("/api/tenants", auth, tenantRoutes);

// =========================
// Property Routes
// =========================
const propertyRoutes = require("./routes/property");
app.use("/api/properties", auth, propertyRoutes);

// =========================
// Unit Routes
// =========================
const unitRoutes = require("./routes/unitRoute");
app.use("/api/units", auth, unitRoutes);

// =========================
// 404 Handler for Unknown Routes
// =========================
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// =========================
// Generic Error Handling Middleware
// =========================
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Server error" });
});

// =========================
// Start Server and Connect to DB
// =========================
(async () => {
  try {
    await connectDB();
    console.log("Connected to database successfully");

    // Seed admin user on startup
    await seedAdminUser();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
})();
