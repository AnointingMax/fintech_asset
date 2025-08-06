import express from 'express';
import validateRequestParameters from '../validation';
import { loginValidator, registerValidator } from '../validation/authValidation';
import { getUserProfile, loginController, registerController } from '../controllers/authController';
import authenticateToken from '../middleware/authMiddleware';

export const authRouter = express.Router();

authRouter.get("/", authenticateToken, getUserProfile)
authRouter.post("/", validateRequestParameters(loginValidator, "body"), loginController)
authRouter.post("/register", validateRequestParameters(registerValidator, "body"), registerController)

export default authRouter