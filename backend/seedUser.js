const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const createUser = async () => {
  try {
    const existingUser = await User.findOne({ email: "admin@test.com" });

    if (existingUser) {
      console.log("Demo user already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      email: "admin@test.com",
      password: hashedPassword,
    });

    console.log("Demo user created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createUser();