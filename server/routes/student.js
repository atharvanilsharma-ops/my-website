const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const mongoose = require("mongoose");

/* =========================
   GET STUDENT ATTENDANCE
========================= */
router.get("/attendance/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    console.log("Fetching attendance for:", studentId);

    // ✅ Convert to ObjectId (VERY IMPORTANT)
    const attendance = await Attendance.find({
      studentId: new mongoose.Types.ObjectId(studentId)
    }).sort({ date: 1 }); // sorted data (better for charts)

    console.log("Records found:", attendance.length);

    res.json(attendance);

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

module.exports = router;