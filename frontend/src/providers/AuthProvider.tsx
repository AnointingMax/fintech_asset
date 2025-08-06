import { AuthContext } from "@/hooks/AuthContext";
import { getFromLocalStorage, setToLocalStorage } from "@/lib/utils";
import { useEffect, useState, type PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
   const [user, setUser] = useState(() => getFromLocalStorage("user"));
   const [token, setToken] = useState(() => getFromLocalStorage("token"))

   useEffect(() => {
      setToLocalStorage("user", user);
      setToLocalStorage("token", token);
   }, [user, token])

   return (
      <AuthContext.Provider value={{ user, setUser, token, setToken }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider