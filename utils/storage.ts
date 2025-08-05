import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { Transaction, User } from '../types';

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const TRANSACTIONS_FILE = path.join(DATA_DIR, 'transactions.json');

export const initializeStorage = async () => {
   await fs.mkdir(DATA_DIR, { recursive: true });

   if (!fsSync.existsSync(USERS_FILE)) {
      await fs.writeFile(USERS_FILE, JSON.stringify({}, null, 2) + '\n');
   }

   if (!fsSync.existsSync(TRANSACTIONS_FILE)) {
      await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify({}, null, 2) + '\n');
   }

   console.log('📁 Storage initialized');
};

export const readUsers = async (): Promise<Record<string, User>> => {
   const data = await fs.readFile(USERS_FILE, 'utf8');
   return JSON.parse(data);
};

//  TODO TYPE FUNCTION PARAMS
export const writeUsers = async (users: Record<string, User>) => {
   await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

export const readTransactions = async (): Promise<Record<string, Transaction[]>> => {
   const data = await fs.readFile(TRANSACTIONS_FILE, 'utf8');
   return JSON.parse(data);
};

//  TODO TYPE FUNCTION PARAMS
export const writeTransactions = async (transactions: Record<string, Transaction[]>) => {
   await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
};