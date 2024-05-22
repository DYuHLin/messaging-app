import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext';
import { jwtDecode } from 'jwt-decode'
import ChatBar from '../Components/ChatBar'
import ChatBox from '../Components/ChatBox'
import { useParams } from 'react-router-dom'

function Home() {
  const { user } = useContext(UserContext);
  let { id } = useParams();

  const show = () => {
    console.log(id)
  }

  return (
    <section>
      <h1 className='register-title'>Home</h1>
      <div className="home-container">
        <ChatBar />
        {
          id === undefined ?  '' : <ChatBox chatId = {id}/>
        }
        
      </div>
      <button onClick={show}>show</button>
    </section>
  )
}

export default Home