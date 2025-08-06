import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { setToLocalStorage } from "@/lib/utils";
import { useAuthContext } from "@/hooks/AuthContext";
import { showSuccessToast } from "@/lib/toast";
import { CustomInput } from "@/components";
import { api } from "@/axios";
import type { ApiResponse, User } from "@/types";
import { Link } from "react-router-dom";

const login = (data: Record<string, string>): Promise<ApiResponse<{ user: User, token: string }>> => api.post("/auth/", data)

const Login = () => {
   const { setUser, setToken } = useAuthContext();

   const validationSchema = Yup.object().shape({
      email: Yup.string().email("Please provide a valid email").required("Please provide a valid email"),
      password: Yup.string().required("Please provide password")
   });
   const initialValues = {
      email: "",
      password: "",
   };

   const { mutate, isPending } = useMutation({
      mutationFn: login,
      onSuccess: ({ message, data }) => {
         showSuccessToast(message);
         setUser(data?.user);
         setToken(data?.token);
         setToLocalStorage("user", data?.user);
         setToLocalStorage("token", data?.token);
      },
   });

   return (
      <div className="grid grid-rows-[max-content,1fr] min-h-screen px-7 py-7 md:px-14 md:py-14">
         <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-center text-primary">Login</h1>
            <p className="text-center max-w-[250px] font-light text-gray-600">Enter your credentials to access your account.</p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => mutate(values)}>
               {({ handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-4 w-full max-w-[500px]">
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
                        {isPending ? "Logging in..." : "Login"}
                     </button>
                  </form>
               )}
            </Formik>
            <Link className="mt-4 hover:underline" to="register">Don't have an account? Register</Link>
         </div>
      </div>
   )
}

export default Login