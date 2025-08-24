// =========================
// Imports and Config
// =========================
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

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
import seedAdminUser from "./utils/autoSeedAdmin.js";

// =========================
// Auth Routes
// =========================
import authRoutes from "./routes/auth.js";
app.use("/api", authRoutes);

// =========================
// Auth Middleware & Protected Route
// =========================
import auth from "./middleware/authMiddleware.js";
app.get("/api/protected", auth, (req, res) => {
  res.send(`Hello user ${req.user.id}, you are authenticated`);
});

// =========================
// Tenant Routes
// =========================
import tenantRoutes from "./routes/tenants.js";
app.use("/api/tenants", auth, tenantRoutes);

// =========================
// move Inmove out routes
// =========================
import moveRoutes from "./routes/moves.js";
app.use("/api", moveRoutes);

// =========================
// Property Routes
// =========================
import propertyRoutes from "./routes/property.js";
app.use("/api/properties", auth, propertyRoutes);

// =========================
// Unit Routes
// =========================
import unitRoutes from "./routes/unit.js";
app.use("/api/units", auth, unitRoutes);

// =========================
// Maintenance Routes (CRUD)
// =========================
import maintenanceRoutes from "./routes/maintenance.js";
app.use("/api/maintenance", auth, maintenanceRoutes);

// =========================
// Stats Routes
// =========================
import dashboardStatsRoutes from "./routes/dashboardStats.js";
app.use("/api/dashboard", auth, dashboardStatsRoutes);

// =========================
// Lease Routes
// =========================
import leaseRoutes from "./routes/leases.js";
app.use("/api/leases", auth, leaseRoutes);

// =========================
// Payment Routes
// =========================
import paymentsRoutes from "./routes/payments.js";
app.use("/api/payments", auth, paymentsRoutes);

// =========================
// User Routes
// =========================
import userRoutes from "./routes/users.js";
app.use("/api/users", userRoutes);

// =========================
// Settings Routes
// =========================
import settingsRoutes from "./routes/settings.js";
app.use("/api/settings", settingsRoutes);

// =========================
// Error handler general
// =========================
app.use(notFound);
app.use(errorHandler);

// =========================
// Start Server and Connect to DB
// =========================
(async () => {
  try {
    await connectDB();
    console.log("Connected to database successfully");

    // Seed admin user on startup
    if (process.env.NODE_ENV === "development") {
      await seedAdminUser();
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
})();
