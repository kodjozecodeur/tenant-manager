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
// =========================
// CORS Configuration - FIXED
// =========================
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    let allowedOrigins;
    
    if (process.env.NODE_ENV === 'production') {
      // For production, use environment variable or default
      const frontendUrl = process.env.FRONTEND_URL || 'https://tenant-manager-frontend.vercel.app';
      allowedOrigins = [
        frontendUrl,
        frontendUrl + '/', // Allow with trailing slash
        frontendUrl.replace(/\/$/, '') // Remove trailing slash if it exists
      ];
    } else {
      // For development
      allowedOrigins = [
        'http://localhost:5173', 
        'http://localhost:5173/',
        'http://localhost:3000',
        'http://localhost:3000/'
      ];
    }
    
    // Remove duplicates
    allowedOrigins = [...new Set(allowedOrigins)];
    
    // Check if origin is in allowed origins
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // For debugging, log the origin that's being blocked
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

// Use the same CORS configuration for both development and production
app.use(cors(corsOptions));
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
// Seed Demo Data Utility
// =========================
import { seedDemoData } from "./seed.js";

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
// Seed Routes
// =========================
import seedRoutes from "./routes/seed.js";
app.use("/api/seed", auth, seedRoutes);

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

    // Seed admin user on startup (in both development and production)
    await seedAdminUser();
    
    // Seed demo data based on environment to avoid overwriting production data
    if (process.env.NODE_ENV === "development" && process.env.AUTO_SEED_DEMO === "true") {
      console.log("Auto-seeding demo data in development environment...");
      try {
        const result = await seedDemoData();
        if (result.success) {
          console.log("Demo data seeded successfully!");
        } else {
          console.error("Error seeding demo data:", result.error);
        }
      } catch (error) {
        console.error("Error during demo data seeding:", error);
      }
    } else if (process.env.NODE_ENV === "production" && process.env.AUTO_SEED_DEMO_PRODUCTION === "true") {
      console.log("Auto-seeding demo data in production environment...");
      try {
        const result = await seedDemoData();
        if (result.success) {
          console.log("Demo data seeded successfully!");
        } else {
          console.error("Error seeding demo data:", result.error);
        }
      } catch (error) {
        console.error("Error during demo data seeding:", error);
      }
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
})();
