import { createContext, useReducer } from "react";

export const VoucherContext = createContext()

export const voucherReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VOUCHERS':
            return {
                vouchers: action.payload
            }
        case 'CREATE_VOUCHER':
            return {
                vouchers: [action.payload, ...state.vouchers]
            }
        case 'DELETE_VOUCHER':
            return {
                vouchers: state.vouchers.filter((w)=> w._id !== action.payload._id)
            }
        case 'UPDATE_VOUCHER':
            return {
                vouchers: [action.payload, ...state.vouchers.filter((v)=> v._id !== action.payload._id)]
            }
        default:
            return state
    }
}

export const VoucherContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(voucherReducer, {
        vouchers: null
    })


    return (
        <VoucherContext.Provider value={{...state,dispatch}}>
            { children }
        </VoucherContext.Provider>
    )
}