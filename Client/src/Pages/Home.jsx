import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext';
import { jwtDecode } from 'jwt-decode';
import ChatBar from '../Components/ChatBar';
import ChatBox from '../Components/ChatBox';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <section>
      <h1 className='register-title'>Home</h1>
      <div className="home-container">
        <ChatBar />
        <ChatBox />
      </div>
    </section>
  )
}

export default Home