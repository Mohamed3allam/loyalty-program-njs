import { createContext, useReducer, useEffect } from "react";

export const ClientAuthContext = createContext();

export const clientAuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return  { client_user: action.payload }
        case 'LOGOUT':
            return { client_user: null }
        default:
            return state
    }
}

export const ClientAuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(clientAuthReducer, { 
        client_user: null
    })

    useEffect(()=> {
        const client_user = JSON.parse(localStorage.getItem('client_user'))
        if (client_user) {
            dispatch({type:'LOGIN', payload: client_user})
        }
    }, [])

    console.log('ClientAuthContext state: ', state)

    return (
        <ClientAuthContext.Provider value={{...state, dispatch}} key={children}>
            {children}
        </ClientAuthContext.Provider>
    )
}