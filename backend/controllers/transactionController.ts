import { Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { TDeposit, TGetTransactions, TInvest, TWithdraw } from "../validation/transactionValidation"
import { returnInvestment, simulateCreditPaymentGateway, simulateDebitPaymentGateway } from "../mock/payment"
import { addTransaction, findUserByEmail, getUserTransactions, updateUser } from "../utils/data"
import { v4 as uuidv4 } from "uuid"
import ErrorWithCode from "../utils/ErrorWithCode"
import { CreditTransaction, DebitTransaction } from "../types"

export const getTransactions = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.user
   const { flow } = req.query as unknown as TGetTransactions

   let transactions = await getUserTransactions(id);

   if (flow) {
      transactions = transactions.filter(transaction => transaction.flow === flow);
   }

   res.json({
      message: "Transactions returned successfully",
      data: transactions
   })
})

export const deposit = catchAsync(async (req: Request, res: Response) => {
   const { id: userId, email } = req.user
   const { amount } = req.body as unknown as TDeposit

   const paymentResult = await simulateCreditPaymentGateway(amount, userId);

   const user = await findUserByEmail(email);

   const previousBalance = user.balance;
   user.balance += amount;
   user.updatedAt = new Date().toISOString();

   await updateUser(email, user);

   const transaction: CreditTransaction = {
      id: uuidv4(),
      userId,
      flow: "credit",
      type: 'deposit',
      amount,
      previousBalance,
      newBalance: user.balance,
      status: 'completed',
      paymentTransactionId: paymentResult.transactionId,
      createdAt: new Date().toISOString()
   };

   await addTransaction(userId, transaction);

   res.json({ message: "Deposit successful" })
})

export const invest = catchAsync(async (req: Request, res: Response) => {
   const { id: userId, email } = req.user
   const { amount } = req.body as unknown as TInvest

   const user = await findUserByEmail(email);

   if (user.balance < amount) throw new ErrorWithCode('Insufficient balance for investment', 400);

   const paymentResult = await simulateDebitPaymentGateway(amount, userId);

   const preInvestmentBalance = user.balance;
   const postInvestmentBalance = user.balance - amount;

   const investmentTransaction: DebitTransaction = {
      id: uuidv4(),
      userId,
      flow: "debit",
      type: 'investment',
      amount,
      previousBalance: preInvestmentBalance,
      newBalance: postInvestmentBalance,
      status: 'completed',
      paymentTransactionId: paymentResult.transactionId,
      createdAt: new Date().toISOString()
   };

   user.balance = postInvestmentBalance;
   user.updatedAt = new Date().toISOString();

   await updateUser(email, user);

   await addTransaction(userId, investmentTransaction);

   await returnInvestment(amount, email)

   res.json({ message: 'Investment completed successfully' })
})

export const withdraw = catchAsync(async (req: Request, res: Response) => {
   const { id: userId, email } = req.user
   const { amount } = req.body as unknown as TWithdraw

   const paymentResult = await simulateDebitPaymentGateway(amount, userId);

   const user = await findUserByEmail(email);

   const previousBalance = user.balance;
   user.balance -= amount;
   user.updatedAt = new Date().toISOString();

   await updateUser(email, user);

   const transaction: DebitTransaction = {
      id: uuidv4(),
      userId,
      flow: "debit",
      type: 'withdrawal',
      amount,
      previousBalance,
      newBalance: user.balance,
      status: 'completed',
      paymentTransactionId: paymentResult.transactionId,
      createdAt: new Date().toISOString()
   };

   await addTransaction(userId, transaction);

   res.json({ message: "Withdrawal successful" })
})