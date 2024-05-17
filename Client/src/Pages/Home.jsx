import React, { useState } from 'react'

function Home() {
  const [chats, setChats] = useState(false);
  return (
    <section>
      <h1 className='register-title'>Home</h1>
      <div className="home-container">
        <div className="chat-side">
          <h3>Chats</h3>
          <input type="text" placeholder='Search Chats' className='chat-bar'/>

          <div className="users-chats">
            {
              chats === false ? <p>You do not have chats...</p> : ''
            }
          </div>
        </div>
        <div className="chat-box">
          <div className="messages">

          </div>
          <div className="send-message">
            <form method='POST'>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home