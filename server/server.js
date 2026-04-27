const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ MIDDLEWARE (VERY IMPORTANT ORDER)
app.use(cors());
app.use(express.json()); // parses JSON body

// ✅ MONGODB CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/attendance")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));



// ✅ ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/teacher", require("./routes/teacher"));
app.use("/student", require("./routes/student"));


// ✅ GLOBAL ERROR HANDLER (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.log("🔥 SERVER ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


// ✅ START SERVER
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});