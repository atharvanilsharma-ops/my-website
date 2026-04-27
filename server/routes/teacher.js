
const express = require("express");
const router = express.Router();
const Lecture = require("../models/Lecture");
const Attendance = require("../models/Attendance");

// ✅ CREATE LECTURE
router.post("/create-lecture", async (req, res) => {
  try {
    const lecture = new Lecture(req.body);
    await lecture.save();
    res.json(lecture);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating lecture" });
  }
});


// ✅ MARK ATTENDANCE (FIXED)
router.post("/mark-attendance", async (req, res) => {
  try {
    const { lectureId, records } = req.body;

    if (!lectureId || !records) {
      return res.status(400).json({ message: "Missing data" });
    }

    // 🔁 Loop through each student record
    for (let r of records) {

      // ❗ VALIDATION (VERY IMPORTANT)
      if (!r.studentId || !r.status) continue;

      // ✅ PREVENT DUPLICATE ENTRY (same student + lecture)
      const existing = await Attendance.findOne({
        studentId: r.studentId,
        lectureId: lectureId
      });

      if (existing) {
        // update instead of duplicate
        existing.status = r.status;
        existing.date = new Date();
        await existing.save();
      } else {
        await Attendance.create({
          studentId: r.studentId,   // ✅ REAL student ID
          lectureId: lectureId,
          status: r.status,
          date: new Date()
        });
      }
    }

    res.json({ message: "Attendance saved successfully ✅" });

  } catch (err) {
    console.log("ATTENDANCE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

