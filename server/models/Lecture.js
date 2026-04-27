// models/Lecture.js
const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  subject: String,
  teacherId: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lecture", lectureSchema);