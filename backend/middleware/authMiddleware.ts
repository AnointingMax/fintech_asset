import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt from 'jsonwebtoken';
import ErrorWithCode from "../utils/ErrorWithCode";
import env from "../config/env";
import { User, User_Token } from "../types";
import { findUserByEmail } from "../utils/data";

declare global {
   namespace Express {
      interface Request {
         user: User;
      }
   }
}

const authenticateToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];

   if (!token) throw new ErrorWithCode("Invalid token", 401)

   const { email } = jwt.verify(token, env.JWT_SECRET) as User_Token;

   const user = await findUserByEmail(email);

   if (!user) throw new ErrorWithCode("Invalid credentials", 401)

   req.user = user;

   next();
});

export default authenticateToken