import * as Yup from "yup";

export const loginValidator = Yup.object().shape({
   email: Yup.string().email().required("Email is required"),
   password: Yup.string().required("Password is required"),
});

export const registerValidator = Yup.object().shape({
   firstName: Yup.string().required("First name is required"),
   lastName: Yup.string().required("Last name is required"),
   email: Yup.string().email().required("Email is required"),
   password: Yup.string()
      .min(6, "Password must contain at least 6 characters")
      .required("Password is required"),
});

export type TLogin = Yup.InferType<typeof loginValidator>
export type TRegister = Yup.InferType<typeof registerValidator>