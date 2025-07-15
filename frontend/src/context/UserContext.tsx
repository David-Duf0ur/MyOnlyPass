
import { createContext, useState, type JSX } from "react";
import type { IUser } from "../types/interfaces";

type IUserContext = {
    id_user: number;
    firstname: string;
    lastname: string;
    avatar: number;
    email: string;
}

type UserContextType = {
    user: IUserContext;
    updateUser: (newUser: IUserContext) => void;
};

export const UserContext = createContext<UserContextType>({
    user: {} as IUserContext,
    updateUser: (_newUser: IUserContext) => { },
});

export function UserProvider({ children, userContext }: { children: JSX.Element; userContext: IUser | null }): JSX.Element {
    const [user, setUser] = useState({
        firstname: userContext?.firstname || "Test",
        lastname: userContext?.lastname || "User",
        avatar: userContext?.avatar || 1,
        email: userContext?.email || "test.user@example.com",
        id_user: userContext?.id_user || 1,
    });

    const updateUser = (newUser: IUserContext) => {
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
