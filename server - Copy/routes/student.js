const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// ✅ GET FULL ATTENDANCE DATA (THIS IS WHAT FRONTEND NEEDS)
router.get("/attendance/:id", async (req, res) => {
  try {
    const studentId = req.params.id.toString();

    console.log("Fetching for:", studentId);

    const attendance = await Attendance.find({ studentId });

    console.log("Records found:", attendance.length);

    res.json(attendance);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

module.exports = router;