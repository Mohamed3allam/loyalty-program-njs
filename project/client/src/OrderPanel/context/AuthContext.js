import { createContext, useReducer, useEffect } from "react";

export const OrderUserAuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return  { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const OrderUserAuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        user: null
    })

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({type:'LOGIN', payload: user})
        }
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <OrderUserAuthContext.Provider value={{...state, dispatch}} key={children}>
            {children}
        </OrderUserAuthContext.Provider>
    )
}