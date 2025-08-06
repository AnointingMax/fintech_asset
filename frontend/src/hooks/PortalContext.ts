import { createContext, useContext } from "react"

type PortalContextType = {
   closePortal: () => void
}

export const PortalContext = createContext<PortalContextType | undefined>(undefined)

export const usePortalContext = () => {
   const value = useContext(PortalContext);

   if (!value) throw new Error("Portal Context must be used within provider")

   return value
}