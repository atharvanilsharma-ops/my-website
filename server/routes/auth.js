const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ LOGIN (FULL SAFE)
router.post("/login", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    // ✅ Prevent crash if body missing
    if (!req.body) {
      return res.status(400).json({ message: "No data received" });
    }

    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // ✅ Find user safely
    const user = await User.findOne({ email }).lean();

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ Prevent crash if password missing
    if (!user.password) {
      return res.status(500).json({ message: "User data corrupted" });
    }

    // ✅ Password check
    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // ✅ Send response
    return res.json({
      _id: user._id,
      name: user.name || "User",
      email: user.email,
      role: user.role
    });


    res.json({
      message: "Login successful",
      user: user
    });

  } catch (err) {
    console.log("🔥 LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

res.json({
  message: "Login successful",
  user: user
});

module.exports = router;