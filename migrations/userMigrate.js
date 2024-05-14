const { SALT_ROUND, ROLE_ADMIN } = require("../config/constants");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const userMigrate = async () => {
  if (!process?.env?.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error(
      "MIGRATION ERROR : env data missing ,Admin migration faild !!"
    );
  }
  const adminExists = await User.findOne({
    email: process?.env?.ADMIN_EMAIL,
    role: ROLE_ADMIN,
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(
      process?.env?.ADMIN_PASSWORD,
      SALT_ROUND
    );
    const adminUser = new User({
      email: process?.env?.ADMIN_EMAIL,
      role: ROLE_ADMIN,
      password: hashedPassword,
    });

    await adminUser.save();
    console.log("Admin user created , migration success");
  } else {
    console.log("Admin data already migrated");
  }
};

module.exports = {
  userMigrate,
};
