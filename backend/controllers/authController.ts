import { Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { TLogin, TRegister } from "../validation/authValidation"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid"
import { findUserByEmail, updateUser } from "../utils/data"
import { readTransactions, writeTransactions } from "../utils/storage"
import ErrorWithCode from "../utils/ErrorWithCode"
import env from "../config/env";

export const loginController = catchAsync(async (req: Request, res: Response) => {
   const { email, password } = req.body as unknown as TLogin

   const user = await findUserByEmail(email);

   if (!user) throw new ErrorWithCode("Invalid credentials", 400)

   const isValidPassword = await bcrypt.compare(password, user.password);
   if (!isValidPassword) throw new ErrorWithCode("Invalid credentials", 400)

   const token = jwt.sign(
      { userId: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: '24h' }
   );

   res.json({ message: "User logged in successfully", data: { user, token } })
})

export const registerController = catchAsync(async (req: Request, res: Response) => {
   const { email, password, firstName, lastName } = req.body as unknown as TRegister

   const existingUser = await findUserByEmail(email, false);
   if (existingUser) throw new ErrorWithCode('User already exists with this email', 400)

   const hashedPassword = await bcrypt.hash(password, 10);
   const userId = uuidv4()

   const user = {
      id: userId,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      balance: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
   };

   await updateUser(email, user);

   const transactions = await readTransactions();
   transactions[userId] = [];
   await writeTransactions(transactions);

   res.status(201).json({ message: "User registered successfully" })
})

export const getUserProfile = catchAsync(async (req: Request, res: Response) => {
   const user = req.user

   res.json({
      message: "Profile returned successfully",
      data: user
   })
})