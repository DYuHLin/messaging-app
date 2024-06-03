import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import SendMessage from './SendMessage'
import {jwtDecode} from 'jwt-decode'

function ChatBox({socket}) {
  const { user, messages, setMessages } = useContext(UserContext);
  const [msg, setMsg] = useState('');
  const decodedUser = jwtDecode(user.accessToken);

  useEffect(() => {
    socket.off('receive_message').on('receive_message', (data) => {
      setMessages((content) => [...content, data.message]);
    });
  },[socket]);

  return (
    <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => {
            return(
              <div className={`msg ${decodedUser.user._id == msg.user._id || decodedUser.user._id == msg.user ? 'you' : 'other'}`} key={index}>
                <div className="msg-info">

                  <div className={`msg-bubble ${decodedUser.user._id == msg.user._id || decodedUser.user._id == msg.user  ? 'you-bubble' : 'other-bubble'}`} >
                    <span className="msg-name">{decodedUser.user._id == msg.user._id || decodedUser.user._id == msg.user ? 'You' : msg.user.name + ' ' + msg.user.surname}</span>
                    {
                      msg.content.trim() != '' ? <div className="msg-content">{msg.content}</div> : ''
                    }
                    {
                      msg.image.trim() != '' ? <img className="msg-img" src={msg.image}/> : ''
                    }
                    {
                      msg.video.trim() != '' ? <a className="msg-img" href={msg.video}>{msg.video}</a>: ''
                    }
                  </div>
                    {/* <span className="msg-time">{new Date(msg.date).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span> */}
                </div>  
              </div>           
            )
          })}
        </div>
        <SendMessage socket={socket}/>
    </div>
  )
}

export default ChatBox