import express from 'express';
import mongoose from 'mongoose';
import { Todo } from '../model.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
}));


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
    if(!todos){
      return res.status(404).json({ error: 'Todos not found' });
    }
    else{
      res.json(todos);
      return res.status(200)
    }
  } catch (error) {
    console.error('Error retrieving Todos:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update todo status
app.put('/update-todo', async (req, res) => {
  console.log(req.body)
  try {
    const { id, completed } = req.body;
    const todo=await Todo.findByIdAndUpdate  (id, { completed }); 
    if(!todo){
      return res.status(404).json({ error: 'Todo not found' });
    }
    else{
      res.json({ message: 'Todo status updated' });
      return res.status(200)
    }
  } catch (error) { 
    console.error('Error updating Todo status:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`ToDo statistcs Service listening at http://localhost:${port}`);
});
