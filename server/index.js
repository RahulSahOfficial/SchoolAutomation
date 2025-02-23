require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(
  __dirname,
  process.env.UPLOADS_DIR || "public/attendanceImages"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Express.js Server!");
});

app.use("/public", express.static(uploadDir));

app.use("/api/headmasters", require("./routes/headmasterRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/classes", require("./routes/classRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
