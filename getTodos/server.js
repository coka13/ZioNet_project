import express from 'express';
import mongoose from 'mongoose';
import { Todo } from '../model.js';

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
try{
  mongoose.connect('mongodb://localhost:27017/todos')
}
catch(err){
  console.error('MongoDB connection error:', err.message);
}


// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error retrieving Todos:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`ToDo statistcs Service listening at http://localhost:${port}`);
});
