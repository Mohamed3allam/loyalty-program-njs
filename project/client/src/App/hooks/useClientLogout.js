import { useClientAuthContext } from "./useClientAuthContext";


export const useClientLogout = () => {
    const { dispatch } = useClientAuthContext()
    const logoutClient = () => {
        // remove user from storage
        localStorage.removeItem('client_user')
        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        window.location.href = '/login-or-signup'
    }
    return {logoutClient}
}