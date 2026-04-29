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

    const attendance = await Attendance.find({
      studentId: studentId.toString()   // ✅ force string match
    });

    res.json(attendance);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

module.exports = router;
