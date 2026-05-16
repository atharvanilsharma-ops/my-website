const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const mongoURI = "mongodb://127.0.0.1:27017/attendance";

// Models
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "teacher", "student"], required: true }
});

const LectureSchema = new mongoose.Schema({
  teacherId: { type: String },
  subject: { type: String },
  date: { type: Date, default: Date.now }
});

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: String },
  lectureId: { type: String },
  status: { type: String, enum: ["present", "absent"] },
  date: { type: Date }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Lecture = mongoose.models.Lecture || mongoose.model("Lecture", LectureSchema);
const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);

async function seedData() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to DB...");

    const plainPassword = "password123";

    await Lecture.deleteMany({});
    await Attendance.deleteMany({});

    // Create Teachers
    const teachers = [
      { name: "Prof. Rajesh Desai", email: "rajesh@university.edu", password: plainPassword, role: "teacher" },
      { name: "Dr. Meera Iyer", email: "meera@university.edu", password: plainPassword, role: "teacher" }
    ];

    const createdTeachers = [];
    for (const t of teachers) {
      let user = await User.findOne({ email: t.email });
      if (!user) {
        user = await User.create(t);
      } else {
        user.password = plainPassword;
        await user.save();
      }
      createdTeachers.push(user);
    }

    // Create Students
    const students = [
      { name: "Aarav Patel", email: "aarav@student.edu", password: plainPassword, role: "student" },
      { name: "Rohan Sharma", email: "rohan@student.edu", password: plainPassword, role: "student" },
      { name: "Vihaan Singh", email: "vihaan@student.edu", password: plainPassword, role: "student" },
      { name: "Ananya Gupta", email: "ananya@student.edu", password: plainPassword, role: "student" },
      { name: "Diya Verma", email: "diya@student.edu", password: plainPassword, role: "student" }
    ];

    const createdStudents = [];
    for (const s of students) {
      let user = await User.findOne({ email: s.email });
      if (!user) {
        user = await User.create(s);
      } else {
        user.password = plainPassword;
        await user.save();
      }
      createdStudents.push(user);
    }

    console.log("Users created!");

    // Generate 30 days of past data
    const subjects = ["Math", "Physics", "Computer Science"];
    
    // Clear old data for these students? Let's just generate new data for the past 30 days
    const today = new Date();
    today.setHours(10, 0, 0, 0);

    for (let i = 30; i >= 0; i--) {
      // 20% chance of an "off day" (weekend or holiday)
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip weekends
      
      // Create 2 lectures per day
      for (let l = 0; l < 2; l++) {
        const teacher = createdTeachers[l % createdTeachers.length];
        const subject = subjects[l % subjects.length];
        
        const lecture = await Lecture.create({
          teacherId: teacher._id.toString(),
          subject: subject,
          date: date
        });

        // Mark attendance for all students
        for (const student of createdStudents) {
          // 85% chance of being present
          const isPresent = Math.random() > 0.15;
          await Attendance.create({
            studentId: student._id.toString(),
            lectureId: lecture._id.toString(),
            status: isPresent ? "present" : "absent",
            date: date
          });
        }
      }
    }

    console.log("Attendance data generated for past 30 days!");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedData();
