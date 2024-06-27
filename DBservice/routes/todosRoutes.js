import express from 'express';
import {  getTodosController, } from '../controllers/todosController.js';

const router = express.Router();

router.get('/', getTodosController);


export default router;