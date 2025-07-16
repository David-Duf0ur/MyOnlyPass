import { createContext, useState, type JSX } from "react";

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

export function UserProvider({ children }: { children: JSX.Element }): JSX.Element {
    const [user, setUser] = useState({
        firstname: "Test",
        lastname: "User",
        avatar: 1,
        email: "test.user@example.com",
        id_user: 1,
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
