import express from 'express';
import { changeStatusController } from '../controllers/todosControllers.js';
const router= express.Router();


router.post("/status/:id",changeStatusController);
export default router;