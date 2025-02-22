const express = require("express");
const router = express.Router();
const pool = require("../DB").pool;

// Sample User Routes
router.get("/classes/:id", async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id);
    // Validate that ID is a number
    if (isNaN(teacherId)) {
      return res.status(400).json({ error: "Invalid teacher ID format" });
    }

    const query =
      "SELECT classes.class_id, classes.class_name FROM classes INNER JOIN teachers ON classes.teacher_id=teachers.teacher_id WHERE teachers.teacher_id = $1";
    const result = await pool.query(query, [teacherId]);

    // Check if teacher exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    // Return the teacher data
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id);

    // Validate that ID is a number
    if (isNaN(teacherId)) {
      return res.status(400).json({ error: "Invalid teacher ID format" });
    }

    // Query the database
    const query = "SELECT * FROM teachers WHERE teacher_id = $1";
    const result = await pool.query(query, [teacherId]);

    // Check if teacher exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Return the teacher data
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract teacher name from request body
    const { name } = req.body;

    // Validate input
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Valid teacher name is required" });
    }

    // Insert the new teacher, letting PostgreSQL handle the auto-increment
    const query = "INSERT INTO teachers (name) VALUES ($1) RETURNING *";
    const result = await pool.query(query, [name]);

    // Return the newly created teacher with the auto-generated ID
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
