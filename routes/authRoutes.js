import express from "express";
import {RegisterController , loginController , testController , forgotPasswordController} from "../controllers/authController.js"
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing 
//Register || Method Post
router.post('/register' , RegisterController)

//LOGIN || POST
router.post('/login' , loginController);

//forgot password
router.post('/forgot-password' , forgotPasswordController);

//test routes
router.get('test' ,requiresSignIn,isAdmin, testController);

export default router;