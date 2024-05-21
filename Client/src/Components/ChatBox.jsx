import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext';
import SendMessage from './SendMessage';

function ChatBox() {
  const [messages, setMessages] = useState(false);

  const { user } = useContext(UserContext);

  return (
    <div className="chat-box">
        <div className="messages">

        </div>
        <SendMessage />
    </div>
  )
}

export default ChatBox