const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Lecture = require("../models/Lecture");
const Attendance = require("../models/Attendance");

/* =======================
   CREATE LECTURE
======================= */
router.post("/create-lecture", async (req, res) => {
  try {
    const { subject, teacherId } = req.body;

    if (!subject || !teacherId) {
      return res.status(400).json({ message: "Subject and Teacher ID required" });
    }

    const lecture = new Lecture({
      subject,
      teacherId: new mongoose.Types.ObjectId(teacherId), // ✅ FIX
      date: new Date()
    });

    await lecture.save();

    res.json(lecture);

  } catch (err) {
    console.log("CREATE LECTURE ERROR:", err);
    res.status(500).json({ message: "Error creating lecture" });
  }
});


/* =======================
   MARK ATTENDANCE
======================= */
router.post("/mark-attendance", async (req, res) => {
  try {
    const { lectureId, records } = req.body;

    if (!lectureId || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ message: "Invalid attendance data" });
    }

    for (let r of records) {

      if (!r.studentId || !r.status) continue;

      const studentObjectId = new mongoose.Types.ObjectId(r.studentId);
      const lectureObjectId = new mongoose.Types.ObjectId(lectureId);

      const existing = await Attendance.findOne({
        studentId: studentObjectId,
        lectureId: lectureObjectId
      });

      if (existing) {
        existing.status = r.status;
        existing.date = new Date();
        await existing.save();

      } else {
        await Attendance.create({
          studentId: studentObjectId,   // ✅ FIX
          lectureId: lectureObjectId,   // ✅ FIX
          status: r.status,
          date: new Date()
        });
      }
    }

    res.json({ message: "Attendance saved successfully ✅" });

  } catch (err) {
    console.log("ATTENDANCE ERROR:", err);
    res.status(500).json({ message: "Server error while saving attendance" });
  }
});


/* =======================
   GET ATTENDANCE (FOR STUDENT DASHBOARD)
======================= */
router.get("/attendance/:studentId", async (req, res) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.params.studentId);

    const data = await Attendance.find({ studentId }).sort({ date: 1 });

    res.json(data);

  } catch (err) {
    console.log("FETCH ATTENDANCE ERROR:", err);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});


module.exports = router;

