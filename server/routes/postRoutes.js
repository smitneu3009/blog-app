import express from 'express';
import { requireSignIn } from '../controllers/userController.js'; // Correct path and named import
import { createPostController } from '../controllers/postController.js';

const router = express.Router();

router.post('/create-post', requireSignIn, createPostController);

export default router;
