import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todosRoutes.js'

const app = express();
const port = 3001;


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
}));
app.use('/api/todos', todosRoutes);

// Connect to MongoDB
try{

  mongoose.connect('mongodb://localhost:27017/todos')
}
catch(err){
  console.error('MongoDB connection error:', err.message);
}




app.listen(port, () => {
  console.log(`ToDo Statistics Service listening at http://localhost:${port}`);
});
