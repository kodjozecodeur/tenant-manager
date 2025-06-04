const User = require("../models/user");

async function seedAdminUser() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if admin user already exists
    let adminUser = await User.findOne({ email: adminEmail });
    if (adminUser) {
      console.log("Admin user already exists.");
      return;
    }

    // Create new admin user
    adminUser = new User({
      name: "Admin",
      email: adminEmail,
      password: adminPassword, // Let pre-save hook hash this
    });

    // Save the admin user (pre-save hook will hash password)
    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
}

module.exports = seedAdminUser;
