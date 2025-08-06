import MoneyActions from "@/components/MoneyActions"
import { Card, CardContent } from "@/components/ui/card"
import UserInfo from "@/components/UserInfo"
import { useAuthContext } from "@/hooks/AuthContext"
import { renderCurrency } from "@/lib/utils"

const Home = () => {
   const { user } = useAuthContext()

   return (
      <div className="grid grid-rows-[max-content,1fr] min-h-screen px-7 py-7 md:px-14 md:py-14">
         <Card className="mx-auto max-w-[400px] w-full text-center">
            <UserInfo />
            <CardContent className="grid gap-5">
               <p className="text-2xl font-bold">{renderCurrency(user?.balance)}</p>
               <MoneyActions />
            </CardContent>
         </Card>
      </div>
   )
}





export default Home