import { LoyaltyContext } from "../context/LoyaltyContext";
import { useContext } from "react";

export const useLoyaltyContext = () => {
    const context = useContext(LoyaltyContext)


    if (!context) {
        throw Error('useLoyaltyContext must be inside an LoyaltyContextProvider')
    }

    return context
}