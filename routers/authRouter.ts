import express from 'express';
import validateRequestParameters from '../validation';
import { loginValidator } from '../validation/authValidation';
import { loginController } from '../controllers/authController';

export const authRouter = express.Router();

authRouter.post("/", validateRequestParameters(loginValidator, "body"), loginController)

export default authRouter