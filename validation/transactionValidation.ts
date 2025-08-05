import * as Yup from "yup";

export const depositValidator = Yup.object().shape({
   amount: Yup.number()
      .transform((value, originalValue) => Math.round(value * 100)) // convert value to kobo
      .positive("Amount must be greater than zero")
      .required("Amount is required")
});

export const investValidator = Yup.object().shape({
   amount: Yup.number()
      .transform((value, originalValue) => Math.round(value * 100)) // convert value to kobo
      .positive("Amount must be greater than zero")
      .required("Amount is required")
});

export const withdrawValidator = Yup.object().shape({
   amount: Yup.number()
      .transform((value, originalValue) => Math.round(value * 100)) // convert value to kobo
      .positive("Amount must be greater than zero")
      .required("Amount is required")
});

export const getTransactionsValidator = Yup.object().shape({
   flow: Yup.string().oneOf(["credit", "debit"])
});

export type TDeposit = Yup.InferType<typeof depositValidator>
export type TInvest = Yup.InferType<typeof investValidator>
export type TWithdraw = Yup.InferType<typeof withdrawValidator>
export type TGetTransactions = Yup.InferType<typeof getTransactionsValidator>
