import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import SendMessage from './SendMessage'
import axios from 'axios'

function ChatBox(props) {
  const [messages, setMessages] = useState(false);

  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   axios({method: 'GET', url: `http://localhost:5000/api/message/${props.chatId}`}, {headers: { "Content-Type": "application/json" }})
  //           .then((res) => setMessages(res.data))
  // },[]);

  const show = () => {
    axios({method: 'GET', url: `http://localhost:5000/api/message/${props.chatId}`}, {headers: { "Content-Type": "application/json" }})
             .then((res) => console.log(res.data))
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