import express from 'express';
import { addNewTodoController, deleteTodoController } from '../controllers/todosControllers.js';

const router= express.Router();


router.post("/addTodo",addNewTodoController);
router.post("/deleteTodo/:id",deleteTodoController);
export default router;