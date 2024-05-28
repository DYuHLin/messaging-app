import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext';
import ChatBar from '../Components/ChatBar'
import ChatBox from '../Components/ChatBox'
import { io } from 'socket.io-client'

const socket = io.connect('http://localhost:5000');
function Home() {
  const { user, chat } = useContext(UserContext);

  return (
    <section>
      <h1 className='register-title'>Home</h1>
      <div className="home-container">
        <ChatBar socket={socket}/>
        {
          chat === false ?  '' : <ChatBox socket={socket}/>
        }
        
      </div>
    </section>
  )
}

export default Home