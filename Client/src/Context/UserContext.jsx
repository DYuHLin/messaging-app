import { createContext, useEffect, useState } from 'react'

const UserContext = createContext();

export const userProvider = ({children}) => {
    const [user, setUser] = useState(false);


    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;