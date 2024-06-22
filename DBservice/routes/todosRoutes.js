import express from 'express';
import { getTodosController, updateTodoController } from '../controllers/todosController.js';

const router = express.Router();

router.get('/', getTodosController);
router.put('/update-todo', updateTodoController);

export default router;