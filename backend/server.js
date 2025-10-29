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
  const newDish = { id: Date.now(), ...req.body };
  dishes.push(newDish);
  res.status(201).json(newDish);
});

app.put("/dishes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = dishes.findIndex(dish => dish.id === id);
  if (index !== -1) {
    dishes[index] = {...dishes[index], ...req.body};
    res.json(dishes[index]);
  } else {
    res.status(404).send();
  }
});

app.delete("/dishes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  dishes = dishes.filter(dish => dish.id !== id);
  res.status(204).send();
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));