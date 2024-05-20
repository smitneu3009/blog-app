import express from 'express';
import userController, { loginController } from '../controllers/userController.js';

const router = express.Router();


router.post('/register',userController);

router.post('/login',loginController);


export default router;