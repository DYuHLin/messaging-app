import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext';
import ChatBar from '../Components/ChatBar'
import ChatBox from '../Components/ChatBox'
import { jwtDecode } from 'jwt-decode'
import { io } from 'socket.io-client'

const socket = io.connect('http://localhost:5000');
function Home() {
  const [chats, setChats] = useState(false);
  const [groups, setGroups] = useState(false);
  const { user, chatId, chat } = useContext(UserContext);
  const decoded = jwtDecode(user.accessToken);

  useEffect(() => {
    axios({method: "GET", url: `http://localhost:5000/api/chat/${decoded.user._id}`}, {headers: {"Content-Type": "application/json"}})
    .then(res => setChats(res.data)
    ).catch(err => console.log(err));  
  },[chats]);

useEffect(() => {
    axios({method: 'GET', url: `http://localhost:5000/api/group/${decoded.user._id}/getgroups`}, {headers: { "Content-Type": "application/json" }})
    .then((res) => setGroups(res.data))
  },[groups]);

  return (
    <section>
      <h1 className='register-title'>Home</h1>
      <div className="home-container">
        <ChatBar socket={socket} groups={groups} chats={chats}/>
        {
          chat === false ?  '' : <ChatBox socket={socket}/>
        } 
      </div>
    </section>
  )
}

export default Home