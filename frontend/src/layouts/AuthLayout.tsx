import { useAuthContext } from "@/hooks/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
   const { token } = useAuthContext();

   if (token) return <Navigate to="/" />

   return (
      <Outlet />
   )
}

export default AuthLayout