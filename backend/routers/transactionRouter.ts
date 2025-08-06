import express from 'express';
import { deposit, getTransactions, invest } from '../controllers/transactionController';
import validateRequestParameters from '../validation';
import { depositValidator, getTransactionsValidator, investValidator } from '../validation/transactionValidation';
import authenticateToken from '../middleware/authMiddleware';

export const transactionRouter = express.Router();

transactionRouter.get(
   "/",
   validateRequestParameters(getTransactionsValidator, "query"),
   authenticateToken,
   getTransactions
)
transactionRouter.post(
   "/deposit",
   validateRequestParameters(depositValidator, "body"),
   authenticateToken,
   deposit
)
transactionRouter.post(
   "/invest",
   validateRequestParameters(investValidator, "body"),
   authenticateToken,
   invest
)
transactionRouter.post(
   "/withdraw",
   validateRequestParameters(investValidator, "body"),
   authenticateToken,
   invest
)

export default transactionRouter