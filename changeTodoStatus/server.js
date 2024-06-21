import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3002;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Connect to MongoDB
try {
  mongoose.connect("mongodb://localhost:27017/todos");
} catch (err) {
  console.error("MongoDB connection error:", err.message);
}

// Endpoint to update ToDo status and send to another microservice
app.post("/todos/status/:id", async (req, res) => {
    console.log(req.body)
  try {
    const { id } = req.params;
    const { completed } = req.body;

    console.log("Updating ToDo status with id:", id);
    // Update the ToDo status in the current microservice
    const response = await axios.put("http://localhost:3000/update-todo", {
      id: id,
      completed: completed,
    });

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.json(response.data);
    }
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).json({ error: 'An error occurred while updating ToDo status' });
  }
});

app.listen(port, () => {
  console.log(
    `ToDo ChangeStatus Service listening at http://localhost:${port}`
  );
});
