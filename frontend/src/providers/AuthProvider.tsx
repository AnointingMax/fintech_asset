import { api } from "@/axios";
import { AuthContext } from "@/hooks/AuthContext";
import { getFromLocalStorage, setToLocalStorage } from "@/lib/utils";
import type { ApiResponse, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, type PropsWithChildren } from "react";

const getUserProfile = (): Promise<ApiResponse<User>> => api.get("/auth")

const AuthProvider = ({ children }: PropsWithChildren) => {
   const [token, setToken] = useState(() => getFromLocalStorage("token"))

   const { data } = useQuery({
      queryKey: ["user"],
      queryFn: getUserProfile,
      enabled: !!token
   })

   const user = data?.data ?? null

   useEffect(() => {
      setToLocalStorage("token", token);
   }, [token])

   return (
      <AuthContext.Provider value={{ user, token, setToken }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider