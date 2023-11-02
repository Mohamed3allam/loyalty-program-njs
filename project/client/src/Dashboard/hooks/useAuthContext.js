import { UserAuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(UserAuthContext)
    if (!context) {
        throw Error('useAuthContext must be inside an AuthContextProvider')
    }
    return context
}