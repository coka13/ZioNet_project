import express from 'express';
const router= express.Router();
import { addNewTodoController, changeStatusController, completedTodos, deleteTodoController } from '../controllers/todosController.js';

router.get('/stats',completedTodos);
router.post("/status/:id",changeStatusController);
router.post("/addTodo",addNewTodoController);
router.post("/deleteTodo/:id",deleteTodoController);

export default router;