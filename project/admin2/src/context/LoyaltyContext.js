import { createContext, useReducer } from "react";

export const LoyaltyContext = createContext()

export const loyaltyReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOYALTY_POINTS':
            return {
                loyalty_points_data: action.payload
            }
        case 'UPDATE_LOYALTY_POINTS':
            return {
                loyalty_points_data: [action.payload, ...state.loyalty_points_data.filter((lp)=> lp._id !== action.payload._id)]
            }
        default:
            return state
    }
}

export const LoyaltyContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(loyaltyReducer, {
        loyalty_points_data: null
    })


    return (
        <LoyaltyContext.Provider value={{...state,dispatch}}>
            { children }
        </LoyaltyContext.Provider>
    )
}