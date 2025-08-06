import Loader from "@/components/Loader"
import TransactionHistory from "@/components/TransactionHistory"
import { Card } from "@/components/ui/card"
import UserInfo from "@/components/UserInfo"
import { Suspense } from "react"

const Home = () => {
   return (
      <div className="grid h-screen max-h-screen px-7 py-7 md:px-14 md:py-14">
         <Card className="mx-auto max-w-[400px] h-fit w-full max-h-[800px] grid grid-rows-[max-content_1fr]">
            <UserInfo />
            <Suspense fallback={<Loader />}>
               <TransactionHistory />
            </Suspense>
         </Card>
      </div>
   )
}

export default Home