import { createContext, useEffect, useRef, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState(false);
    const [imageInfo, setImageInfo] = useState({
        _id: "66423dd5b9c4d29102ffef31"
    });
    const socket = io.connect('http://localhost:5000');
    const chatId = useRef();

    const ProtectedRoutes = () => {
        return (
            user === false ? (<Navigate to='/login' />) : user.accessToken ? (<Outlet />) : ''
        )
    };

    return(
        <UserContext.Provider value={{user, setUser, ProtectedRoutes, setImageInfo, imageInfo, messages, setMessages, chat, setChat, socket, chatId}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;