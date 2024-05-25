import express from 'express';
import userController, { loginController, requireSignIn, updateUserController } from '../controllers/userController.js';

const router = express.Router();

router.post('/register',userController);

router.post('/login',loginController);

router.put('/update-user',requireSignIn,updateUserController);


export default router;