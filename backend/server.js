const pool = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.get("/dishes", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM dishes ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/dishes", async (req, res) => {
  try {
    const { dishName, description, category, imageUrl } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO dishes (dishName, description, category, imageUrl)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [dishName, description, category, imageUrl]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database insert failed" });
  }
});

app.put("/dishes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { dishName, description, category, imageUrl } = req.body;

    const { rows } = await pool.query(
      `UPDATE dishes
       SET dishName = $1,
           description = $2,
           category = $3,
           imageUrl = $4
       WHERE id = $5
       RETURNING *`,
      [dishName, description, category, imageUrl, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Dish not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database update failed" });
  }
});

app.delete("/dishes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const { rows } = await pool.query(
      `DELETE FROM dishes WHERE id = $1 RETURNING *`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Dish not found" });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database delete failed" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));