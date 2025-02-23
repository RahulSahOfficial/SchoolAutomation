const express = require("express");
const router = express.Router();

const pool = require("../DB").pool;
const { emailRegex } = require("../utils/checks");

const bcrypt = require("bcrypt");

router.get("/", async (_, res) => {
  try {
    const query = "SELECT * FROM students";
    const result = await pool.query(query);

    const data = result.rows;
    for (let i = 0; i < data.length; i++) {
      delete data[i]["password"];
    }
    res.status(200).send(data);
  } catch (error) {
    console.log("Error while getting info for the student: ", error);
    return res.status.send({ error: "Internal server error." });
  }
});

router.post("/register", async (req, res) => {
  try {
    let { rollNo, name, email, hashedPassword, classId } = req.body;

    rollNo = parseInt(rollNo);
    if (isNaN(rollNo)) {
      return res.status(400).send({ error: "Invalid student roll no. format" });
    }

    classId = parseInt(classId);
    if (isNaN(classId)) {
      return res.status(400).send({ error: "Invalid student class ID format" });
    }

    if (!name || typeof name != "string" || name.trim() === "") {
      return res.status(400).send({ error: "Invalid name format." });
    }

    if (
      !email ||
      typeof email != "string" ||
      email.trim() === "" ||
      !emailRegex.test(email)
    ) {
      return res.status(400).send({ error: "Invalid email format" });
    }

    const emailCheckQuery = "SELECT * FROM students WHERE email=$1";
    const emailCheckQueryResult = await pool.query(emailCheckQuery, [email]);
    if (emailCheckQueryResult.rows.length > 0) {
      return res
        .status(400)
        .send({ error: "Email is already taken, use some other email." });
    }

    const query =
      "INSERT INTO students (roll_no, name, email, password, class_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await pool.query(query, [
      rollNo,
      name,
      email,
      hashedPassword,
      classId,
    ]);
    const data = result.rows[0];
    delete data["password"];

    return res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log("Error while registering new student: ", error);
    return res.status(500).send({ error: "Internal server error." });
  }
});

//login for students
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (
      !email ||
      typeof email != "string" ||
      email.trim() === "" ||
      !emailRegex.test(email)
    ) {
      return res.status(400).json({ error: "Valid student email is required" });
    }

    if (!password || typeof password != "string" || password.trim() === "") {
      return res
        .status(400)
        .json({ error: "Valid student password is required" });
    }

    //  get password for the given email id
    const query = "SELECT * FROM students WHERE email=$1";
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) {
      return res.status(400).send({ error: "Email does not exists." });
    }

    const data = result.rows[0];
    const passwordFromDB = data.password;
    const match = await bcrypt.compare(password, passwordFromDB);

    if (match) {
      delete data["password"];
      return res.status(200).send(data);
    }
    return res.status(400).send({ error: "Invalid password of the student." });
  } catch (error) {
    console.error("Error logging in for student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/class/:classId", async (req, res) => {
  try {
    const classId = parseInt(req.params.classId);
    if (isNaN(classId)) {
      return res
        .status(400)
        .send({ error: "Invalid class id format to fetch students." });
    }
    const query = "SELECT * FROM students WHERE class_id=$1";
    const result = await pool.query(query, [classId]);

    const data = result.rows;
    for (let i = 0; i < data.length; i++) {
      delete data[i]["password"];
    }
    res.status(200).send(data);
  } catch (error) {
    console.log("Error while getting info for the student of class: ", error);
    return res.status.send({ error: "Internal server error." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
      return res.status(400).send({ error: "Invalid student id format." });
    }
    const query = "SELECT * FROM students WHERE student_id=$1";
    const result = await pool.query(query, [studentId]);

    const data = result.rows[0];

    delete data["password"];
    res.status(200).send(data);
  } catch (error) {
    console.log("Error while getting info for the student: ", error);
    return res.status.send({ error: "Internal server error." });
  }
});

module.exports = router;
