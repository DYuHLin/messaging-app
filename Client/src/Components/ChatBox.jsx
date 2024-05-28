import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import SendMessage from './SendMessage'
import axios from 'axios'
import { io } from 'socket.io-client'

function ChatBox({socket}) {
  const { user, messages, setMessages, chat } = useContext(UserContext);
  const [msg, setMsg] = useState('');

  const show = () => {
    console.log(messages)
  }

  useEffect(() => {
    socket.off('receive_message').on('receive_message', (data) => {
      setMessages((content) => [...content, data.message]);
    });

    // return () => socket.off("reccieved");
  },[socket]);

  return (
    <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => {
            return(
              <div className="msg-bubble" key={index}>
                <div className="msg-content">{msg.content}</div>
              </div>
            )
          })}
        </div>
        <SendMessage socket={socket}/>
        <button onClick={show}>show</button>
    </div>
  )
}

export default ChatBox