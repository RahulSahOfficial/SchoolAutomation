const express = require("express");
const router = express.Router();
const pool = require("../DB").pool;

router.post("/addBulk", async (req, res) => {
  try {
    const { data } = req.body;
    for (let i = 0; i < data.length; i++) {
      const className = data[i].className;
      const teacherId = parseInt(data[i].teacherId);
      if (
        !className ||
        typeof className != "string" ||
        className.trim() === ""
      ) {
        res.status(400).send({
          error: `Invalid class name format for class at index ${i}.`,
        });
      }
      if (isNaN(teacherId)) {
        res
          .status(400)
          .send({ error: `Invalid teacher id format at index: ${i}.` });
      }
    }
    const valueSets = [],
      valueParams = [];
    let paramIndex = 1;

    data.forEach((record) => {
      const { className, teacherId } = record;
      valueSets.push(`($${paramIndex}, $${paramIndex + 1})`);
      valueParams.push(className, teacherId);
      paramIndex += 2;
    });

    const bulkQuery = `INSERT INTO classes (class_name, teacher_id) 
                       VALUES ${valueSets.join(", ")} RETURNING *`;
    const result = await pool.query(bulkQuery, valueParams);

    const results = result.rows;
    res.status(201).json({ inserted: results.length, records: results });
  } catch (error) {
    console.log("Error while bulk upload of classes:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
});

router.post("/add", async (req, res) => {
  try {
    let { className, teacherId } = req.body;
    if (!className || typeof className != "string" || className.trim() === "") {
      return res.status(400).send({ error: "Invalid class name." });
    }
    teacherId = parseInt(teacherId);
    if (isNaN(teacherId)) {
      return res
        .status(400)
        .send({ error: "Invalid teacher id for the class." });
    }

    const query =
      "INSERT INTO classes (class_name, teacher_id) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, [className, teacherId]);
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log("Error while inserting class: ", error);
    return res.status(500).send({ error: "Internal server error." });
  }
});

module.exports = router;
