const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let dishes = [];

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.get("/dishes", (req, res) => {
  res.json(dishes);
});

app.post("/dishes", (req, res) => {
  const newDish = req.body;
  dishes.push(newDish);
  res.status(201).json(newDish);
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
