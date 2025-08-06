import { api } from "@/axios";
import { CustomInput } from "@/components";
import { showSuccessToast } from "@/lib/toast";
import type { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"

const register = (data: Record<string, string>): Promise<ApiResponse> => api.post("/auth/register", data)

const Register = () => {
   const navigate = useNavigate();

   const validationSchema = Yup.object().shape({
      email: Yup.string().email("Please provide a valid email").required("Please provide a valid email"),
      password: Yup.string().required("Please provide password"),
      firstName: Yup.string().required("Please provide password"),
      lastName: Yup.string().required("Please provide password"),
   });
   const initialValues = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
   };

   const { mutate, isPending } = useMutation({
      mutationFn: register,
      onSuccess: ({ message }) => {
         showSuccessToast(message);
         navigate("/auth")
      },
   });

   return (
      <div className="grid grid-rows-[max-content,1fr] min-h-screen px-7 py-7 md:px-14 md:py-14">
         <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-center text-primary">Register</h1>
            <p className="text-center max-w-[250px] font-light text-gray-600">Enter your credentials to create your account.</p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => mutate(values)}>
               {({ handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-4 w-full max-w-[500px]">
                     <CustomInput
                        label="First name"
                        name="firstName"
                        placeholder="Email"
                        onChange={handleChange}
                     />
                     <CustomInput
                        label="Last name"
                        name="lastName"
                        placeholder="Email"
                        onChange={handleChange}
                     />
                     <CustomInput
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                     />
                     <CustomInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        showPasswordToggle
                        onChange={handleChange}
                     />
                     <button type="submit" className="w-full p-3 mt-3 text-white transition bg-primary rounded-md hover:bg-primary/80" disabled={isPending}>
                        Register
                     </button>
                  </form>
               )}
            </Formik>
         </div>
      </div>
   )
}

export default Register