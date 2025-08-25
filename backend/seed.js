// seed.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.js";
import Tenant from "./models/tenant.js";
import Property from "./models/property.js";
import Unit from "./models/unit.js";
import Lease from "./models/lease.js";
import Payment from "./models/payment.js";

// Load environment variables
dotenv.config();

export async function seedDemoData() {
  try {
    console.log("Seeding demo data...");

    // Clear old data
    await Promise.all([
      User.deleteMany(),
      Tenant.deleteMany(),
      Property.deleteMany(),
      Unit.deleteMany(),
      Lease.deleteMany(),
      Payment.deleteMany(),
    ]);

    // Create demo admin (landlord) and tenant
    const admin = await User.create({
      name: "Demo Admin",
      email: "admin@demo.com",
      password: "demo123",
      phone: "555-0000",
      role: "admin",
    });

    const tenantUser = await User.create({
      name: "Demo Tenant",
      email: "tenant@demo.com",
      password: "demo123",
      phone: "555-1111",
      role: "tenant",
    });

    // Property + Unit
    const property = await Property.create({
      name: "Sunset Apartments",
      address: "123 Main Street",
      landlord: admin._id,
      createdBy: admin._id,
    });

    const unit = await Unit.create({
      property: property._id,
      unitName: "A-101",
      unitNumber: "A-101",
      rent: 500,
      createdBy: admin._id,
    });

    // Tenant + Lease
    const tenant = await Tenant.create({
      user: tenantUser._id,
      name: "John Doe",
      email: "john@tenant.com",
      phone: "555-1234",
      property: property._id,
      unit: unit._id,
    });

    const lease = await Lease.create({
      tenant: tenant._id,
      property: property._id,
      unit: unit._id,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2025-01-01"),
      rentAmount: 500,
    });

    // Payments
    await Payment.create([
      { tenant: tenant._id, lease: lease._id, amount: 500, date: new Date("2024-01-01"), status: "Paid" },
      { tenant: tenant._id, lease: lease._id, amount: 500, date: new Date("2024-02-01"), status: "Paid" },
      { tenant: tenant._id, lease: lease._id, amount: 500, date: new Date("2024-03-01"), status: "Pending" },
    ]);

    console.log("✅ Demo DB seeded!");
    return { success: true, message: "Demo data seeded successfully!" };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    return { success: false, message: "Error seeding database", error: error.message };
  }
}

// If run directly, execute seeding
if (import.meta.url === `file://${process.argv[1]}`) {
  // For direct execution, we need to connect and then close
  const MONGO_URI = process.env.MONGO_URI;
  mongoose.connect(MONGO_URI).then(async () => {
    console.log("✅ Connected to MongoDB...");
    await seedDemoData();
    mongoose.connection.close();
  }).catch(error => {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  });
}

export default seedDemoData;