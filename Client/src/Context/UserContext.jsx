import { createContext, useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(false);
    const [imageInfo, setImageInfo] = useState(false);

    const ProtectedRoutes = () => {
        return (
            user === false ? (<Navigate to='/login' />) : user.accessToken ? (<Outlet />) : ''
        )
    };

    return(
        <UserContext.Provider value={{user, setUser, ProtectedRoutes, setImageInfo, imageInfo}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;