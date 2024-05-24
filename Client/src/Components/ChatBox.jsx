import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import SendMessage from './SendMessage'
import axios from 'axios'
import { io } from 'socket.io-client'

function ChatBox(props) {
  const { user, messages, setMessages } = useContext(UserContext);

  // const socket = io('http://localhost:5000');

   useEffect(() => {
     axios({method: 'GET', url: `http://localhost:5000/api/message/${props.chatId}`}, {headers: { "Content-Type": "application/json" }})
             .then((res) => setMessages(res.data))
   },[]);

  const show = () => {
    console.log(messages)
  }

  return (
    <div className="chat-box">
        <div className="messages">

        </div>
        <SendMessage />
        <button onClick={show}>show</button>
    </div>
  )
}

export default ChatBox