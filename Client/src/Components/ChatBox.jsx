import React, { useState } from 'react'
import * as faIcons from 'react-icons/fa'

function ChatBox() {
  const [messages, setMessages] = useState();
  const [content, setContent] = useState();

  return (
    <div className="chat-box">
        <div className="messages">

        </div>
        <div className="send-message">
            <form method='POST' className='message-form'>
              <input type="text" required name='name' id='name' className='name' onChange={(e) => setName(e.target.value)} placeholder='Send a message'/>
              <div className="img-upload">
                <label htmlFor="img" className='img-label'><faIcons.FaImage className='img-icon' /></label>
                <input type="file" name="img" id="img" />
              </div>
              <input type="text" className='hidden'/>
              
              <button className='send-message'>Send Message</button>
            </form>
        </div>
    </div>
  )
}

export default ChatBox