const User = require("../models/user.model");
const Roles = require("../config/roles")

module.exports = async () => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: adminUsername,
      password: adminPassword,
      email: adminEmail,
      role: Roles['admin'],
    });
    console.log("Initial admin user created");
  }
};
