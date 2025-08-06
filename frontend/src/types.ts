export type User = {
   id: string;
   email: string;
   firstName: string;
   lastName: string;
   password: string;
   balance: number;
   createdAt: string;
   updatedAt: string;
}

export type CreditTransaction = {
   flow: "credit",
   type: "deposit" | "returns";
   id: string;
   userId: string;
   amount: number;
   previousBalance: number;
   newBalance: number;
   status: string;
   paymentTransactionId: string;
   createdAt: string;
}

export type DebitTransaction = {
   flow: "debit",
   type: "withdrawal" | "investment";
   id: string;
   userId: string;
   amount: number;
   previousBalance: number;
   newBalance: number;
   status: string;
   paymentTransactionId: string;
   createdAt: string;
}

export type Transaction = CreditTransaction | DebitTransaction