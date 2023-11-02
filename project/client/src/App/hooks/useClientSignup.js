import { useState } from "react";
import config from "../../config";
import { useClientAuthContext } from "./useClientAuthContext";

export const useClientSignup = () => {

    const luxerApi = config.luxerApi
    const [ errorSignup, setError ] = useState(null)
    const [ signupLoading, setIsLoading ] = useState(null)
    const { dispatch } = useClientAuthContext()

    const signupClient = async (name, phone, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${luxerApi}/clients/signup-client`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, phone, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('client_user', JSON.stringify(json))
            //update auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            window.location.href = '/'
        }
    }

    return { signupClient, signupLoading, errorSignup }
}