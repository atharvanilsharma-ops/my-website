const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  lectureId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// 🔥 Add index for fast queries
attendanceSchema.index({ studentId: 1 });

module.exports = mongoose.model("Attendance", attendanceSchema);