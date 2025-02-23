const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const pool = require("../DB").pool;

const { emailRegex } = require("../utils/checks");

//login for teachers
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      !email ||
      typeof email != "string" ||
      email.trim() === "" ||
      !emailRegex.test(email)
    ) {
      return res
        .status(400)
        .send({ error: "Invalid email id format for teacher." });
    }

    if (!password || typeof password != "string" || password.trim() === "") {
      return res
        .status(400)
        .send({ error: "Invalid password format for teacher." });
    }

    const query = "SELECT * FROM teachers WHERE email = $1";
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) {
      return res.status(400).send({ error: "Invalid email for teacher." });
    }
    const data = result.rows[0];
    const hashedPassword = data.password;
    const match = await bcrypt.compare(password, hashedPassword);

    if (match) {
      delete data["password"];
      return res.status(200).send(data);
    }
    return res
      .status(400)
      .send({ error: "Invalid password for the given email." });
  } catch (error) {
    console.log("Error in logging in for teacher: ", error);
    res.status(500).send({ error: "Internal server error." });
  }
});

//register for teachers
router.post("/register", async (req, res) => {
  try {
    // Extract teacher details from request body
    let { name, email, hashedPassword, headmasterId } = req.body;

    // Validate input
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Valid teacher name is required" });
    }
    // Validate input
    if (
      !email ||
      typeof email !== "string" ||
      email.trim() === "" ||
      !emailRegex.test(email)
    ) {
      return res.status(400).json({ error: "Valid teacher email is required" });
    }
    if (
      !hashedPassword ||
      typeof hashedPassword !== "string" ||
      hashedPassword.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Valid teacher password is required." });
    }
    headmasterId = parseInt(headmasterId);
    if (isNaN(headmasterId)) {
      return res
        .status(400)
        .send({ error: "Invalid headmaster id for teacher." });
    }

    const emailCheckQuery = "SELECT * FROM teachers WHERE email=$1";
    const emailCheckQueryResult = await pool.query(emailCheckQuery, [email]);
    if (emailCheckQueryResult.rows.length > 0) {
      return res
        .status(400)
        .send({ error: "Email is already registered. Use someother email." });
    }

    // Insert the new teacher, letting PostgreSQL handle the auto-increment
    const query =
      "INSERT INTO teachers (name, email, password, headmaster_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const result = await pool.query(query, [
      name,
      email,
      hashedPassword,
      headmasterId,
    ]);

    const data = result.rows[0];

    delete data["password"];

    // Return the newly created teacher with the auto-generated ID
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//get classes under this teacher
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

router.get("/headmaster/:id", async (req, res) => {
  try {
    const headmasterId = parseInt(req.params.id);
    if (isNaN(headmasterId)) {
      return res
        .status(400)
        .send({ error: "Headmaster ID format is not right." });
    }

    const query = "SELECT * FROM teachers WHERE headmaster_id=$1";
    const result = await pool.query(query, [headmasterId]);
    const data = result.rows;

    for (let i = 0; i < data.length; i++) {
      delete data[i]["password"];
    }

    return res.status(200).send(data);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  let teacherId = req.params.id;
  teacherId = parseInt(teacherId);
  if (isNaN(teacherId)) {
    return res.status(400).send({ error: "Id format for teacher is invalid." });
  }

  const query = "SELECT * FROM teachers WHERE teacher_id=$1";
  const result = await pool.query(query, [teacherId]);
  const data = result.rows[0];
  delete data["password"];
  console.log(data);

  res.status(200).send(data);
});

router.get("/", async (_, res) => {
  try {
    const query = "SELECT * FROM teachers";
    const result = await pool.query(query);

    const data = result.rows;
    for (let i = 0; i < data.length; i++) {
      delete data[i]["password"];
    }
    res.status(200).send(data);
  } catch (error) {
    console.log("Error while getting all teachers: ", error);
    return res.status(500).send({ error: "Internal server error." });
  }
});

module.exports = router;
