import { useAuthContext } from "@/hooks/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AppLayout = () => {
   const { token } = useAuthContext();

   if (!token) return <Navigate to="/auth" />

   return (
      <Outlet />
   )
}

export default AppLayout