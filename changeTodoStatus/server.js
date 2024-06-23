import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todosRoutes from "./routes/todosRoutes.js";

const app = express();
const port = 3002;

app.use(express.json());
// Configure CORS middleware with the correct origin
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use('/api/todos', todosRoutes);

// Connect to MongoDB
try {
  mongoose.connect("mongodb://mongodb:27017/todos");
} catch (err) {
  console.error("MongoDB connection error:", err.message);
}


app.listen(port, () => {
  console.log(
    `ToDo ChangeStatus Service listening at http://localhost:${port}`
  );
});
