import { useState } from "react";
import config from "../../config";
import { useClientAuthContext } from "./useClientAuthContext";

export const useClientLogin = () => {

    const luxerApi = config.luxerApi
    const [errorLogin, setError] = useState(null)
    const [loginLoading, setIsLoading] = useState(null)
    const { dispatch } = useClientAuthContext()

    const loginClient = async (phone, password) => {

        //loading state condition and error condition
        setIsLoading(true)
        setError(false)

        const response = await fetch(`${config.api}/clients/login-client`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({phone,password})
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // SAVE USER TO LOCAL STORAGE
            localStorage.setItem('client_user', JSON.stringify(json))
            // UPDATE AUTH CONTEXT
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            window.location.href = '/'
        }
    }
    return {loginClient, loginLoading, errorLogin}
}