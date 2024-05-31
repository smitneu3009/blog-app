import express from 'express';
import { requireSignIn } from '../controllers/userController.js'; // Correct path and named import
import { createPostController, deletePostController, getLatestPostTimeController, getPostsController, getUserPostsController } from '../controllers/postController.js';

const router = express.Router();

router.post('/create-post', requireSignIn, createPostController);

router.get('/get-all-posts', getPostsController);

router.get('/get-user-posts',requireSignIn, getUserPostsController);

router.get('/get-latest-post-time', getLatestPostTimeController); // New route

router.delete('/delete-post/:id', requireSignIn, deletePostController); 

export default router;
