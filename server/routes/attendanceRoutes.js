require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require("../DB").pool;

const uploadDir = path.join(
  __dirname,
  process.env.UPLOADS_DIR || "../public/attendanceImages"
);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + path.extname(file.originalname).split(".")[1]);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer upload middleware
const upload = multer({ storage, fileFilter });

// Middleware to parse JSON data in the request
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically

// Route to handle file upload and JSON data
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file ? `/attendanceImages/${req.file.filename}` : null;
    const data = JSON.parse(req.body.data);
    // console.log(data);

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    const date = data.date;
    const attendanceData = [];
    for (let student of data.attendance) {
      attendanceData.push({
        student_id: student.student_id,
        date,
        status: student.present ? "present" : "absent",
        img_url: imageUrl,
      });
    }

    const valueParams = [];
    const valueSets = [];
    let paramIndex = 1;

    attendanceData.forEach((record) => {
      const { student_id, date, status, img_url } = record;
      valueSets.push(
        `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${
          paramIndex + 3
        })`
      );
      valueParams.push(student_id, date, status, img_url);
      paramIndex += 4;
    });

    const bulkQuery = `INSERT INTO attendance (student_id, date, status, img_url) 
                       VALUES ${valueSets.join(", ")} RETURNING *`;
    const result = await pool.query(bulkQuery, valueParams);
    const results = result.rows;
    res
      .status(201)
      .json({ inserted: results.length, records: results, imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let { date, teacherId, classId } = req.body;
    teacherId = parseInt(teacherId);
    classId = parseInt(classId);
    const query =
      "SELECT COUNT(attendance.attendance_id) AS total, COUNT(CASE WHEN attendance.status = 'present' THEN 1 END) AS present FROM attendance, teachers, students, classes WHERE attendance.student_id=students.student_id AND students.class_id=classes.class_id AND classes.class_id=$1 AND classes.teacher_id=$2 AND attendance.date=TO_DATE($3, 'DD-MM-YYYY');";
    const result = await pool.query(query, [classId, teacherId, date]);
    if (result.rows.length === 0) {
      return res.status(400).send({ error: "Parameters don't match" });
    }
    return res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ error: "There was server internal error." });
  }
});

module.exports = router;
