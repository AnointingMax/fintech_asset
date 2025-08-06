import { BanknoteArrowDown, BanknoteArrowUp, HandCoins } from "lucide-react"
import { Button } from "@/components/ui/button"
import CustomModal from "./CustomModal"
import Deposit from "@/portals/Deposit"
import Invest from "@/portals/Invest"
import Withdraw from "@/portals/Withdraw"

const MoneyActions = () => {
   return (
      <div className="flex flex-wrap items-center gap-4">
         <CustomModal
            size="sm"
            trigger={<Button title="Deposit" className="flex-1"><BanknoteArrowDown />Deposit</Button>}
            title="Deposit"
         >
            <Deposit />
         </CustomModal>

         <CustomModal
            size="sm"
            trigger={<Button className="flex-1"><BanknoteArrowUp />Withdraw</Button>}
            title="Withdraw"
         >
            <Withdraw />
         </CustomModal>

         <CustomModal
            size="sm"
            trigger={<Button title="Invest" className="flex-1"><HandCoins />Invest</Button>}
            title="Invest"
         >
            <Invest />
         </CustomModal>
      </div>
   )
}

export default MoneyActions