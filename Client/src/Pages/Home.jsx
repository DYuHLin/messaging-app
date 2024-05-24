import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext';
import ChatBar from '../Components/ChatBar'
import ChatBox from '../Components/ChatBox'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
const socket = io.connect('http://localhost:5000');

function Home() {
  const { user } = useContext(UserContext);
  let { id } = useParams();

  const socket = useRef();

  useEffect(() => {

  },[]);

  return (
    <section>
      <h1 className='register-title'>Home</h1>
      <div className="home-container">
        <ChatBar />
        {
          id === undefined ?  '' : <ChatBox chatId = {id}/>
        }
        
      </div>
    </section>
  )
}

export default Home