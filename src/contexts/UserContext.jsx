import {createContext, useContext, useState, useEffect} from 'react';

const UserContext = createContext();

export function UserProvider({children}) {
    const [user, setUser]= useState({
        username: 'TangoTeam',
        email: 'tangoteam@gmail.com',
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}