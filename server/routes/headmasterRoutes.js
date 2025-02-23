const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const pool = require("../DB").pool;

const { emailRegex } = require("../utils/checks");

//register for headmaster
router.post("/register", async (req, res) => {
  try {
    const { name, email, hashedPassword } = req.body;
    if (!name || typeof name != "string" || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Valid headmaster name is required" });
    }
    if (
      !email ||
      typeof email != "string" ||
      email.trim() === "" ||
      !emailRegex.test(email)
    ) {
      return res
        .status(400)
        .json({ error: "Valid headmaster email is required" });
    }

    const emailCheckQuery = "SELECT * FROM headmasters WHERE email=$1";
    const emailCheckQueryResult = await pool.query(emailCheckQuery, [email]);
    if (emailCheckQueryResult.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email id already used, use someother email." });
    }

    if (
      !hashedPassword ||
      typeof hashedPassword != "string" ||
      hashedPassword.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Valid headmaster password is required" });
    }
    const query =
      "INSERT INTO headmasters (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const result = await pool.query(query, [name, email, hashedPassword]);
    const data = result.rows[0];
    delete data["password"];
    res.status(201).send(data);
  } catch (error) {
    console.log("Error registering headmaster:", error);
    return res.status.json({ error: "Internal sever error" });
  }
});

//login for headmaster
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
      return res
        .status(400)
        .json({ error: "Valid headmaster email is required" });
    }

    if (!password || typeof password != "string" || password.trim() === "") {
      return res
        .status(400)
        .json({ error: "Valid headmaster password is required" });
    }

    //  get password for the given email id
    const query = "SELECT * FROM headmasters WHERE email=$1";
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
    return res
      .status(400)
      .send({ error: "Invalid password of the headmaster." });
  } catch (error) {
    console.error("Error logging in for headmaster:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get headmaster by ID
router.get("/:id", async (req, res) => {
  try {
    const headmasterId = parseInt(req.params.id);

    // Validate that ID is a number
    if (isNaN(headmasterId)) {
      return res.status(400).json({ error: "Invalid headmaster ID format" });
    }

    // Query the database
    const query = "SELECT * FROM headmasters WHERE headmaster_id = $1";
    const result = await pool.query(query, [headmasterId]);

    // Check if headmaster exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Headmaster not found" });
    }
    const data = result.rows[0];
    delete data["password"];

    // Return the headmaster data
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching headmaster:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get all headmasters
router.get("/", async (_, res) => {
  try {
    const query = "SELECT * FROM headmasters";
    const result = await pool.query(query);
    const data = result.rows;
    for (let i = 0; i < data.length; i++) {
      delete data[i]["password"];
    }
    return res.status(200).send(data);
  } catch (error) {
    console.log("Error fetching all headmasters: ", error);
    return res.status(500).send({ error: "Internal server error." });
  }
});

module.exports = router;
