import { VoucherContext } from "../context/VoucherContext";
import { useContext } from "react";

export const useVouchersContext = () => {
    const context = useContext(VoucherContext)


    if (!context) {
        throw Error('useVouchersContext must be inside an VoucherContextProvider')
    }

    return context
}