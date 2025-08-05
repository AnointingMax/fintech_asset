import { Transaction, User } from "../types";
import { readTransactions, readUsers, writeTransactions, writeUsers } from "./storage";

export const findUserByEmail = async (email: string) => {
   const users = await readUsers();
   return users[email] || null;
};

export const findUserById = async (userId: string) => {
   const users = await readUsers();
   return Object.values(users).find(user => user.id === userId) || null;
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