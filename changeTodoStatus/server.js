import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todosRoutes from "./routes/todosRoutes.js";

const app = express();
const port = 3002;
const host = '0.0.0.0';

app.use(express.json());
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


app.listen(port, host);
console.log(`Running on http://${host}:${port}`);