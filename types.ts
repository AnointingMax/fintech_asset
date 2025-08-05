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

export type Transaction = {
   id: string;
   userId: string;
   type: string;
   amount: number;
   previousBalance: number;
   newBalance: number;
   status: string;
   paymentTransactionId: string;
   createdAt: string;
}

export type User_Token = {
   userId: string,
   email: string
}