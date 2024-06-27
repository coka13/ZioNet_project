import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todosRoutes.js'
import dotenv from 'dotenv';
import { connectQueue } from './lib/amqp.js';
import { addTodoService, deleteTodoByIDService, updateTodoService } from './services/todoServices.js';
import { sendMail } from './lib/mailer/sendMail.js';


dotenv.config(); // dotenv.config() helps fetch .env variables
const app = express();
const port = 3000;
const host = 'localhost';

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/api/todos', todosRoutes);

// Connect to MongoDB
try{
  mongoose.connect('mongodb://localhost:27017/todos')
}
catch(err){
  console.error('MongoDB connection error:', err.message);
}

try{
  let channel = await connectQueue();

  // Queue consumer. Will execute all created jobs.
  channel.consume(process.env.QUEUE_NAME, async( data )=>{
    if( data !== null ){
        let msg = data.content.toString(); // Convert buffer to string
        msg = JSON.parse(msg); // convert string to JSON object

        let status = {};
        console.log('Message received:', msg);
        switch( msg.action ){
          case 'add':
            status = await addTodoService(msg.task);
            await sendMail(`Your do was added \n Todo:${msg.task}`);
            console.log('Status',status);
            channel.ack(data); // Use channel and data ( arg received in callback )
            break;
          case 'update':
            status = await updateTodoService(msg.id, msg.completed);
            await sendMail(`Your do was updated \n Todo:${msg.task}`);
            console.log('Status',status);
            channel.ack(data);
            break;
          case 'delete':
            status = await deleteTodoByIDService(msg.id);
            await sendMail(`Your todo was deleted \n Todo:${msg.task}`);
            console.log('Status',status);
            channel.ack(data);
            break;
          default:
            console.log('No task action found!');
        }
    }
  },{
    noAck:false // Only delete from queue channel.ack(data) is succeesful
  });
}
catch(err){
  console.error('Cannot connect to channel', err.message);
}






app.listen(port, host);
console.log(`Running on http://${host}:${port}`);