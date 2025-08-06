import { useAuthContext } from "@/hooks/AuthContext"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { renderCurrency } from "@/lib/utils"
import MoneyActions from "./MoneyActions"

const UserInfo = () => {
   const { user } = useAuthContext()

   return (
      <CardHeader className="text-center">
         <Avatar className="size-[85px] mx-auto">
            <AvatarFallback>{`${user?.firstName[0]}${user?.lastName[0]}`}</AvatarFallback>
         </Avatar>
         <CardTitle className="text-2xl">{user?.firstName} {user?.lastName}</CardTitle>
         <CardDescription className="text-base">{user?.email}</CardDescription>
         <p className="text-2xl font-bold text-center">{renderCurrency(user?.balance)}</p>
         <MoneyActions />
      </CardHeader>
   )
}

export default UserInfo