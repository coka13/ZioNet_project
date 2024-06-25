import express from 'express';
import { addTodoController, deleteTodoByIDController, getTodosController, updateTodoController } from '../controllers/todosController.js';

const router = express.Router();

router.get('/', getTodosController);
router.put('/update-todo', updateTodoController);
router.post('/add', addTodoController);
router.delete('/deleteTodoByID/:id', deleteTodoByIDController);

export default router;