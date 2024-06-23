import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean
});

export const Todo = mongoose.model('Todo', todoSchema);