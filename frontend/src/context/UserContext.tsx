// @ts-nocheck
import { createContext, useState, type JSX } from "react";

export const UserContext = createContext({
    user: {
        firstname: "",
        lastname: "",
        avatar: 0,
        email: "",
        idUser: 1,
    },
    updateUser: (newUser) => { },
});

export function UserProvider({ children, userContext }): JSX.Element {
    const [user, setUser] = useState({
        firstname: userContext?.firstname || "Test",
        lastname: userContext?.lastname || "User",
        avatar: userContext?.avatar || 1,
        email: userContext?.email || "test.user@example.com",
        idUser: userContext?.idUser || 1,
    });

    const updateUser = (newUser) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...newUser,
        }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
