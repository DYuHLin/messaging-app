import React from 'react'

function Home() {
  return (
    <section>
      <h1 className='register-title'>Home</h1>
      <div className="home-container">
        <div className="chat-side">
          <h3>Chats</h3>
          <input type="text" placeholder='Search Chats'/>
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