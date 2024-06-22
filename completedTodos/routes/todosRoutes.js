import express from 'express';
const router= express.Router();
import { completedTodos } from '../controllers/todosController.js';

router.get('/stats',completedTodos);

export default router;