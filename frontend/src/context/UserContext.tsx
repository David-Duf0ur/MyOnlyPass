
import { createContext, useState, type JSX } from "react";
import type { IUser } from "../types/interfaces";

export const UserContext = createContext({
    user: {
        firstname: "",
        lastname: "",
        avatar: 0,
        email: "",
        idUser: 1,
    },
    updateUser: (_newUser: IUser) => { },
});

export function UserProvider({ children, userContext }: { children: JSX.Element; userContext: IUser | null }): JSX.Element {
    const [user, setUser] = useState({
        firstname: userContext?.firstname || "Test",
        lastname: userContext?.lastname || "User",
        avatar: userContext?.avatar || 1,
        email: userContext?.email || "test.user@example.com",
        idUser: userContext?.id_user || 1,
    });

    const updateUser = (newUser: IUser) => {
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
