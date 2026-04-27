const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ CREATE USER
router.post("/create-user", async (req, res) => {
  try {
    console.log(req.body); // debug

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = new User({
      name,
      email,
      password,
      role
    });

    await user.save();

    res.json({ message: "User created successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE USER
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;