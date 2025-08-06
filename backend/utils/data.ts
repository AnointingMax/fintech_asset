import { Transaction, User } from "../types";
import ErrorWithCode from "./ErrorWithCode";
import { readTransactions, readUsers, writeTransactions, writeUsers } from "./storage";

export const findUserByEmail = async (email: string) => {
   const users = await readUsers();
   const user = users[email];

   if (!user) throw new ErrorWithCode("Invalid credentials", 401)

   return user
};

export const findUserById = async (userId: string) => {
   const users = await readUsers();
   const user = Object.values(users).find(user => user.id === userId);

   if (!user) throw new ErrorWithCode("Invalid credentials", 401)

   return user
};

export const updateUser = async (email: string, user: User) => {
   const users = await readUsers();
   users[email] = user;
   await writeUsers(users);
};

export const getUserTransactions = async (userId: string) => {
   const transactions = await readTransactions();
   return transactions[userId] || [];
};

export const addTransaction = async (userId: string, transaction: Transaction) => {
   const transactions = await readTransactions();

   if (!transactions[userId]) {
      transactions[userId] = [];
   }

   transactions[userId].unshift(transaction);

   await writeTransactions(transactions);
};