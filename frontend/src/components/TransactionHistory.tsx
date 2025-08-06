import { api } from "@/axios"
import { cn, renderCurrency } from "@/lib/utils"
import type { ApiResponse, Transaction } from "@/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { MoveDownRight, MoveUpLeft } from "lucide-react"
import { CardContent } from "./ui/card"

const transactionFn = (params: { flow?: "credit" | "debit" }): Promise<ApiResponse<Transaction[]>> => api.get("/transactions", { params })

const TransactionHistory = () => {
   const { data } = useSuspenseQuery({
      queryKey: ["transactions"],
      queryFn: () => transactionFn({})
   })

   const transactions = data?.data

   return (
      <CardContent className="grid overflow-scroll">
         <h2 className="uppercase text-gray-600 text-sm mb-2">Transaction History</h2>
         <div className="grid gap-2">
            {transactions?.map((tnx) => <Transaction transaction={tnx} key={tnx.id} />)}
         </div>
      </CardContent>
   )
}

const Transaction = ({ transaction }: { transaction: Transaction }) => {
   return (
      <div className="flex items-center gap-2">
         <span
            className={cn("p-2 aspect-square rounded-full flex items-center justify-center",
               transaction.flow === "credit" ? "bg-green-200 [&>svg]:stroke-green-600" : "bg-red-200 [&>svg]:stroke-red-600"
            )}
         >
            {transaction.flow === "credit" ? <MoveDownRight className="size-4.5" /> : <MoveUpLeft className="size-4.5" />}
         </span>
         <div className="flex-1">
            <p className="font-bold">{renderCurrency(transaction.amount)}</p>
            <p className="text-sm text-gray-500">{format(transaction.createdAt, "PPp")}</p>
         </div>
         <p className="uppercase text-sm text-gray-600">{transaction.type}</p>
      </div>
   )
}

export default TransactionHistory
