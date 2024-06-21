import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';


const app = express();
const port = 3001;


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


// Endpoint to fetch statistics of completed todos
app.get('/todos/stats', async (req, res) => {
  console.log(req.body)
  try {
    // Fetch all todos from the first microservice
    const response = await axios.get('http://localhost:3000/todos');
    const todos = response.data;

    // Calculate number of completed todos
    const completedCount = todos.filter(todo => todo.completed).length;
    
    // Calculate incomplete todos
    const incompleteCount = todos.filter(todo => !todo.completed).length;

 const  stats = {
    completedTodos: completedCount,
    incompleteTodos: incompleteCount,
  };

  if (response.status === 200) {
    res.status(200).json(stats);
  } else {
    res.json(stats);
  }

  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching ToDo statistics' });
  }
});

app.listen(port, () => {
  console.log(`ToDo Statistics Service listening at http://localhost:${port}`);
});
