import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext';
import ChatBar from '../Components/ChatBar'
import ChatBox from '../Components/ChatBox'

function Home() {
  const { user, chat } = useContext(UserContext);

  return (
    <section>
      <h1 className='register-title'>Home</h1>
      <div className="home-container">
        <ChatBar />
        {
          chat === false ?  '' : <ChatBox/>
        }
        
      </div>
    </section>
  )
}

export default Home