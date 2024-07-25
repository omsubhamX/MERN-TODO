const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");

// Signup
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Ensure bcrypt.hash is awaited properly
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({ email, username, password: hashedPassword });

    // Save the user to the database
    const savedUser = await user.save();
    console.log("User saved:", savedUser);

    res.status(200).json({ user: savedUser });
  } catch (error) {
    console.log("Error during registration:", error);
    res.status(400).json({ message: "User Already Exists or Error in saving user" });
  }
});

// Get all users (for testing)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log("Fetched users:", users);
    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Signin
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Please Sign Up First" });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is Not Correct" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others });
  } catch (error) {
    console.log("Error during sign in:", error);
    res.status(400).json({ message: "Error during sign in" });
  }
});

module.exports = router;
