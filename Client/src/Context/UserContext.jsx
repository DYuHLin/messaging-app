import { createContext, useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(false);
    const [messages, setMessages] = useState(false);
    const [imageInfo, setImageInfo] = useState({
        _id: "66423dd5b9c4d29102ffef31"
    });

    const ProtectedRoutes = () => {
        return (
            user === false ? (<Navigate to='/login' />) : user.accessToken ? (<Outlet />) : ''
        )
    };

    return(
        <UserContext.Provider value={{user, setUser, ProtectedRoutes, setImageInfo, imageInfo, messages, setMessages}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;