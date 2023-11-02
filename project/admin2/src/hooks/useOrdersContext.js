import { OrderContext } from "../context/OrderContext";
import { useContext } from "react";

export const useOrdersContext = () => {
    const context = useContext(OrderContext)


    if (!context) {
        throw Error('useOrdersContext must be inside an OrderContextProvider')
    }

    return context
}