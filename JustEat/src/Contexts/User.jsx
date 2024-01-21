import React, { createContext, useContext, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const UsersContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUserInfo] = useState({});
    const [userCart, setUserCart] = useState(JSON.parse(localStorage.getItem('@justeat/cart')) || []);
    const navigate = useNavigate();

    async function getUserInfo(){
        if(localStorage.getItem("@justeat/auth")){
            api.get("/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("@justeat/auth")
                }
            }).then((userInfo) => {
                setUserInfo(userInfo.data);
            }).catch(() => {
                localStorage.removeItem("@justeat/auth");
                navigate("/");
            });

            api.interceptors.request.use((conf) => {
                conf.headers.setAuthorization("Bearer " + localStorage.getItem("@justeat/auth"));
                return conf;
            });
        }
    }

    function makeLogout(){
        setUserInfo({});
        localStorage.removeItem("@justeat/auth");
    }

    return (
        <UsersContext.Provider value={{
            user,
            getUserInfo,
            makeLogout,
            setUserCart,
            userCart
        }}>
            { children }
        </UsersContext.Provider>
    );
};

export function useUser(){
    const context = useContext(UsersContext);
    return context;
}