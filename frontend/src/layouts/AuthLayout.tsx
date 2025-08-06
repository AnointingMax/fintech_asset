import { useAuthContext } from "@/hooks/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
   const { token, user } = useAuthContext();

   if (token && user) return <Navigate to="/" />

   return (
      <Outlet />
   )
}

export default AuthLayout