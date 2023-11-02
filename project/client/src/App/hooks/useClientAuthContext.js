import { useContext } from "react";
import { ClientAuthContext } from "../context/ClientAuthContext";

export const useClientAuthContext = () => {
    const context = useContext(ClientAuthContext)
    if (!context) {
        throw Error('useClientAuthContext must be inside an ClientAuthContextProvider')
    }
    return context
}