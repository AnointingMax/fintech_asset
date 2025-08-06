import { v4 as uuidv4 } from "uuid"
import { addTransaction, findUserByEmail, updateUser } from "../utils/data";
import { CreditTransaction } from "../types";
import { renderCurrency } from "../utils/render";

export const simulateDebitPaymentGateway = async (amount: number, userId: string) => {
   console.log(`[PAYMENT GATEWAY SIMULATION (DEBIT)] User: ${userId}, Amount: ${renderCurrency(amount)}`);

   return {
      transactionId: `txn_${uuidv4()}`,
      gatewayResponse: 'Payment processed successfully',
   };
};

export const simulateCreditPaymentGateway = async (amount: number, userId: string) => {
   console.log(`[PAYMENT GATEWAY SIMULATION (CREDIT)] User: ${userId}, Amount: ${renderCurrency(amount)}`);

   return {
      transactionId: `txn_${uuidv4()}`,
      gatewayResponse: 'Payment processed successfully',
   };
};

export const returnInvestment = async (investedAmount: number, email: string) => {
   const user = await findUserByEmail(email);

   const paymentResult = await simulateCreditPaymentGateway(investedAmount, user.id);

   const returnRate = 0.05; // 5% return
   const returns = investedAmount * (1 + returnRate);

   const preReturnsBalance = user.balance
   const postReturnsBalance = user.balance + returns

   const returnsTransaction: CreditTransaction = {
      id: uuidv4(),
      userId: user.id,
      flow: "credit",
      type: 'returns',
      amount: returns,
      previousBalance: preReturnsBalance,
      newBalance: postReturnsBalance,
      status: 'completed',
      paymentTransactionId: paymentResult.transactionId,
      createdAt: new Date().toISOString()
   };

   user.balance = postReturnsBalance;
   user.updatedAt = new Date().toISOString();

   await updateUser(email, user);

   await addTransaction(user.id, returnsTransaction);
}