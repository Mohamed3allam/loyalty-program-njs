import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import config from "../../config";

export const useLogin = () => {

    const luxerApi = config.luxerApi
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {

        //loading state condition and error condition
        setIsLoading(true)
        setError(false)

        const response = await fetch(`${luxerApi}/user-auth/login-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // SAVE USER TO LOCAL STORAGE
            localStorage.setItem('user', JSON.stringify(json))
            // UPDATE AUTH CONTEXT
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            window.location.href = '/dashboard/create-order'
        }
    }
    return {login, isLoading, error}
}