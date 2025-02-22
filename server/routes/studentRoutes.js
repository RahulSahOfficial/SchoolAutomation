const express = require("express");
const router = express.Router();
const pool = require("../DB").pool;

router.get("/class/:id", async (req, res) => {
  try {
    const classId = parseInt(req.params.id);
    if (!isNaN(classId)) {
      return res.status(400).json({ error: "Invalid class id format." });
    }

    const query =
      "SELECT students.student_id, students.name, students.roll_no FROM students WHERE students.class_id = $1";
    const result = await pool.query(query, [classId]);

    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Class not found." });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);

    // Validate that ID is a number
    if (isNaN(studentId)) {
      return res.status(400).json({ error: "Invalid student ID format" });
    }

    // Query the database
    const query = "SELECT * FROM students WHERE student_id = $1";
    const result = await pool.query(query, [studentId]);

    // Check if student exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Return the student data
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract student data from request body
    const { name, roll_no, class_id } = req.body;

    // Validate input
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Valid student name is required" });
    }

    if (
      roll_no === null ||
      isNaN(parseInt(roll_no)) ||
      parseInt(roll_no) <= 0
    ) {
      return res
        .status(400)
        .json({ error: "Roll No must be a positive number" });
    }

    if (
      class_id === null ||
      isNaN(parseInt(class_id)) ||
      parseInt(class_id) <= 0
    ) {
      return res
        .status(400)
        .json({ error: "Class ID must be a positive number or null" });
    }

    // Insert the new student, letting PostgreSQL handle the auto-increment
    const query =
      "INSERT INTO students (name,roll_no,  class_id) VALUES ($1, $2, $3) RETURNING *";
    const result = await pool.query(query, [name, roll_no, class_id]);

    // Return the newly created student with the auto-generated ID
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Check for foreign key violation
    if (error.code === "23503") {
      return res.status(400).json({ error: "Referenced class does not exist" });
    }

    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
