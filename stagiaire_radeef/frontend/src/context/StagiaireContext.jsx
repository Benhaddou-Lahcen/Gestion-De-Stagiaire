import { createContext, useContext, useState } from "react"
import StagiaireApi from "../services/Api/StagiaireApi";


export  const StagiaireStateContext = createContext({
    user: {},
    authenticated: false,
    setUser: () => {},
    logout: () => {},
    login: (email,password) => {},
    setAuthenticated: () => {},
    setToken: (token) => {},

});
export default function StagiaireContext({children}) {
    const [user,setUser] = useState({});
    const [authenticated,_setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'));
    const login = async (email,password) => {
        //await StagiaireApi.getCsrfToken()
        return await StagiaireApi.login(email,password)
    }
    const logout = () => {
        setUser({})
        setAuthenticated(false)
    };
    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem('AUTHENTICATED',isAuthenticated)
    }
    const setToken = (token) => {
        window.localStorage.setItem('token',token)
    }
    return <>
    <StagiaireStateContext.Provider value={{
        user,
        login,
        authenticated,
        setAuthenticated,
        logout,
        setUser,
        setToken
     }}>
        {children}
    </StagiaireStateContext.Provider>
    </>
}
export const useUserContext = () => useContext(StagiaireStateContext)
