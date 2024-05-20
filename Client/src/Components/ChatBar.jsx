import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext'
import { jwtDecode } from 'jwt-decode'

function ChatBar() {
    const [chats, setChats] = useState(false);
    const { user } = useContext(UserContext);
  
    useEffect(() => {
        const decoded = jwtDecode(user.accessToken);
            axios({method: "GET", url: `http://localhost:5000/api/chat/${decoded.user._id}`}, {headers: {"Content-Type": "application/json"}})
            .then(res => setChats(res.data)
            ).catch(err => console.log(err));  
      },[]);

  return (
    <div className="chat-side">
        <h3>Chats</h3>
        <input type="text" placeholder='Search Chats' className='chat-bar'/>

        <div className="users-chats">
            {
              chats === false ? <p>You do not have chats...</p> : chats.map((chat, id) => {
                
              })
            }
        </div>
    </div>
  )
}

export default ChatBar