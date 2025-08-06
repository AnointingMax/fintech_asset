import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const renderCurrency = (amount: number | string = 0, currency: string = "NGN"): string => new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency,
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
}).format(parseFloat(amount?.toString() ?? 0) || 0);

export const renderNumber = (amount: number | string = 0): string => new Intl.NumberFormat("en-GB", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
}).format(parseFloat(amount.toString()) || 0);

export const getFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value && value !== "undefined" ? JSON.parse(value) : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const setToLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving "${key}":`, error);
  }
};

export const removeFromLocalStorage = (...keys: string[]) => keys.forEach(key => localStorage.removeItem(key));

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing local storage:`, error);
  }
};