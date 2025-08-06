import type { User } from "@/types";
import { createContext, useContext, type Dispatch } from "react"

type AuthContextType = {
   user: User | null,
   setUser: Dispatch<React.SetStateAction<User | null>>,
   token: string,
   setToken: Dispatch<React.SetStateAction<string>>,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
   const value = useContext(AuthContext);

   if (!value) throw new Error("Auth Context must be used within provider")

   return value
}