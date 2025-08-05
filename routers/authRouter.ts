import express from 'express';
import validateRequestParameters from '../validation';
import { loginValidator, registerValidator } from '../validation/authValidation';
import { loginController, registerController } from '../controllers/authController';

export const authRouter = express.Router();

authRouter.post("/", validateRequestParameters(loginValidator, "body"), loginController)
authRouter.post("/register", validateRequestParameters(registerValidator, "body"), registerController)

export default authRouter