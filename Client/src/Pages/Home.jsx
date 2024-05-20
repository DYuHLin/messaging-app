import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext';
import { jwtDecode } from 'jwt-decode';

function Home() {
  const [chats, setChats] = useState(false);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    const decoded = jwtDecode(user.accessToken);
        axios({method: "GET", url: `http://localhost:5000/api/chat/${decoded.user._id}`}, {headers: {"Content-Type": "application/json"}})
        .then(res => setChats(res.data)
        ).catch(err => console.log(err));  
  },[]);

  const show = () => {
    console.log(chats)
  }

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
      <button onClick={show}>show</button>
    </section>
  )
}

export default Home