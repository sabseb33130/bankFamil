import { ReactElement, createContext, useState } from 'react';
import { TUser } from '../types/users';
import { userDefault } from '../constant/userDefault';
interface UserContextProps {
    children: ReactElement;
}
export interface UserContextInterface {
    user: TUser;
    onUserChange: (user: TUser) => void;
}
export const UserContext = createContext<UserContextInterface>({
    user: userDefault,
    onUserChange: (user: TUser) => {},
});

export const UserContextProvider = ({ children }: UserContextProps) => {
    const [user, setUser] = useState<TUser>(userDefault);
    const handleUserChange = (user: TUser) => {
        setUser(user);
    };
    const contextValue = {
        user: user,
        onUserChange: handleUserChange,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
