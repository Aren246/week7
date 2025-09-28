import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json("Recipe API is running!");
});

app.get("/api/recipes", async (_req, res) => {
  try {
    const data = await db.query("SELECT * FROM recipes ORDER BY id DESC;");
    res.json(data.rows);
    console.count("getting recipes");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/recipes", async (_req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});