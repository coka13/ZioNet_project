import mongoose from "mongoose";
import { Todo } from "./model.js";

try {
  mongoose.connect("mongodb://localhost:27017/todos");
} catch (err) {
  console.log("Cannot connect to database");
}

const insertTodos = [
  { task: "Do the dishes", completed: false },
  { task: "Walk the dog", completed: true },
  { task: "Buy some milk", completed: true },
  { task: "Clean the house", completed: false },
  { task: "Read a book", completed: false },
  { task: "Go for a run", completed: true },
  { task: "Call a friend", completed: false },
];

const insertData = async () => {
  try {
    await Todo.deleteMany({});
    await Todo.insertMany(insertTodos);
    console.log("Data inserted");
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.log("Cannot insert data");
  }
};

insertData();
