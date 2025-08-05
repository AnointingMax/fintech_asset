import { Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { TLogin } from "../validation/authValidation"

export const loginController = catchAsync(async (req: Request, res: Response) => {
   const { email, password } = req.body as unknown as TLogin

   res.json({ message: "User logged in successfully" })
})