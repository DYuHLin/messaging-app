import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom';

function ChatBar({socket}) {
    const [chats, setChats] = useState(false);
    const { user, setChat, chat, setMessages, messages, chatId } = useContext(UserContext);
    const decoded = jwtDecode(user.accessToken);
  
    useEffect(() => {
        const decoded = jwtDecode(user.accessToken);
            axios({method: "GET", url: `http://localhost:5000/api/chat/${decoded.user._id}`}, {headers: {"Content-Type": "application/json"}})
            .then(res => setChats(res.data)
            ).catch(err => console.log(err));  
      },[]);

      const show = () => {
        console.log(chatId.current)
        console.log(messages)
      }
      const selectChat = (id) => {
        setChat(id);
        chatId.current = id;
        axios({method: "GET", url: `http://localhost:5000/api/message/${id}`}, {headers: {"Content-Type": "application/json"}})
            .then(res => setMessages(res.data)
            ).catch(err => console.log(err));  


        socket.emit('join_chat', chatId.current);
   
      };
  return (
    <div className="chat-side">
        <h3>Chats</h3>
        <input type="text" placeholder='Search Chats' className='chat-bar'/>

        <div className="users-chats">
            {
              chats === false ? <p>You do not have chats...</p> : chats.map((chat, id) => {
                return(
                    
                    chat.user._id == decoded.user._id ? (
                            <div className="user" key={id} onClick={() => selectChat(chat._id)}>
                                <div className="user-info">
                                    <div className="img-container">
                                        <img className='user-img' src={chat.creator.profileImg.image} alt="user icon" /> 
                                    </div>
                                    <span>{chat.creator.name + " " + chat.creator.surname}</span>
                                </div>                              
                            </div>
                    ) : chat.creator._id == decoded.user._id ? (
                            <div className="user" key={id} onClick={() => selectChat(chat._id)}>
                                <div className="user-info">
                                    <div className="img-container">
                                        <img className='user-img' src={chat.user.profileImg.image} alt="user icon" /> 
                                    </div>
                                    <span>{chat.user.name + " " + chat.user.surname}</span>
                                </div>                              
                            </div>
                    ): ''
                )
              }) 
            }
        </div>
        <button onClick={show}>show</button> 
    </div>
  )
}

export default ChatBar