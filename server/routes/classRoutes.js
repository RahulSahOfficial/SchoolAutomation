const express = require("express");
const router = express.Router();
const pool = require("../DB").pool;

// Sample User Routes
router.get("/:id", async (req, res) => {
  try {
    const classId = parseInt(req.params.id);

    // Validate that ID is a number
    if (isNaN(classId)) {
      return res.status(400).json({ error: "Invalid class ID format" });
    }

    // Query the database
    const query = "SELECT * FROM classes WHERE class_id = $1";
    const result = await pool.query(query, [classId]);

    // Check if class exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Return the class data
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/students/:id", async (req, res) => {
  try {
    const classId = req.params.id;
    if (isNaN(classId)) {
      return res.status(400).json({ error: "Invalid class ID format" });
    }

    const query =
      "SELECT students.student_id, students.roll_no, students.name FROM students INNER JOIN classes ON students.class_id = classes.class_id AND classes.class_id = $1";
    const result = await pool.query(query, [classId]);

    // Check if class exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Return the class data
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract class data from request body
    const { class_name, teacher_id } = req.body;

    // Validate input
    if (
      !class_name ||
      typeof class_name !== "string" ||
      class_name.trim() === ""
    ) {
      return res.status(400).json({ error: "Valid class name is required" });
    }

    if (
      teacher_id !== null &&
      (isNaN(parseInt(teacher_id)) || parseInt(teacher_id) <= 0)
    ) {
      return res
        .status(400)
        .json({ error: "Teacher ID must be a positive number or null" });
    }

    // Insert the new class, letting PostgreSQL handle the auto-increment
    const query =
      "INSERT INTO classes (class_name, teacher_id) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, [class_name, teacher_id]);

    // Return the newly created class with the auto-generated ID
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Check for foreign key violation
    if (error.code === "23503") {
      return res
        .status(400)
        .json({ error: "Referenced teacher does not exist" });
    }

    console.error("Error creating class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
