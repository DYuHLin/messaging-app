import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import SendMessage from './SendMessage'
import axios from 'axios'
import { io } from 'socket.io-client'

function ChatBox() {
  const { user, messages, setMessages, chat, socket } = useContext(UserContext);

  const show = () => {
    console.log(messages)
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((current) => {
        return [...current, data]
      });
    });

    return () => socket.off("reccieved");
  },[socket]);

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