import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const UsersContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUserInfo] = useState({});

    useEffect(() => {
        async function getUserInfo(){
            if(localStorage.getItem("@justeat/auth")){
                api.get("/user", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("@justeat/auth")
                    }
                }).then((userInfo) => {
                    setUserInfo(userInfo.data);
                });

                api.interceptors.request.use((conf) => {
                    conf.headers.setAuthorization("Bearer " + localStorage.getItem("@justeat/auth"));
                });
            }
        }

        getUserInfo();
    }, []);

    return (
        <UsersContext.Provider value={{
            user
        }}>
            { children }
        </UsersContext.Provider>
    );
};

export function useUser(){
    const context = useContext(UsersContext);
    return context;
}