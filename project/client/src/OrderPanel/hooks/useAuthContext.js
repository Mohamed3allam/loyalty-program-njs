import { OrderUserAuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(OrderUserAuthContext)
    if (!context) {
        throw Error('useAuthContext must be inside an AuthContextProvider')
    }
    return context
}