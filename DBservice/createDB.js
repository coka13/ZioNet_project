import mongoose from "mongoose";
import { Todo } from "./model.js";

const MONGO_URI = "mongodb://localhost:27017/todos";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
    });
    console.log("Connected to MongoDB");
    await insertData();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process on connection failure
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

const insertData = async () => {
  const insertTodos = [
    { task: "Do the dishes", completed: false },
    { task: "Walk the dog", completed: true },
    { task: "Buy some milk", completed: true },
    { task: "Clean the house", completed: false },
    { task: "Read a book", completed: false },
    { task: "Go for a run", completed: true },
    { task: "Call a friend", completed: false },
  ];

  try {
    await Todo.deleteMany({});
    await Todo.insertMany(insertTodos);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error.message);
    throw error; // Propagate the error to handle it in connectToMongoDB or elsewhere
  }
};

// Start the application by connecting to MongoDB
connectToMongoDB();
