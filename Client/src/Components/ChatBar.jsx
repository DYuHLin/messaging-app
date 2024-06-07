import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import UserContext from '../Context/UserContext'
import { jwtDecode } from 'jwt-decode'

function ChatBar({socket, groups, chats}) {
    const [hidden, setHidden] = useState('Chats');
    const [search, setSearch] = useState('');
    const { user, setChat, setMessages, messages, chatId, setName, valid, setValid } = useContext(UserContext);
    const decoded = jwtDecode(user.accessToken);

      const selectChat = (id, name, surname) => {
        setChat(id);
        setName(name + ' ' + surname);
        setValid('valid');
        chatId.current = id;
        axios({method: "GET", url: `http://localhost:5000/api/message/${id}`}, {headers: {"Content-Type": "application/json"}})
            .then(res => setMessages(res.data)
            ).catch(err => console.log(err));  
        socket.emit('join_chat', chatId.current); 
      };

  return (
    <div className={`chat-side ${valid == 'valid' ? 'hidden' : ''}`}>
        <h3>Chats</h3>
        <input type="text" placeholder='Search Chats' className='chat-bar' onChange={(e) => setSearch(e.target.value)}/>

        <div className="users-chats">
            <div className="bar-options">
                <button className="bar-chats" onClick={() => {setHidden(hidden == 'Chats' ? 'Groups' : 'Chats')}}>{hidden}</button>
            </div>        
            {
              chats === false ? <p>You do not have chats...</p> : chats.filter((item) => {
                return search.toLocaleLowerCase() === '' ? item : item.creator.name.toLocaleLowerCase().includes(search) || item.user.name.toLocaleLowerCase().includes(search);
                }).map((chat, id) => {
                 return(
                    chat.members.map((member) => {
                        return (
                        member.user._id !== decoded.user._id ? (
                            <div className={`user ${hidden == 'Groups' ? 'hidden' : ''}`} key={id} onClick={() => selectChat(chat._id, member.user.name, member.user.surname)}>
                                <div className="user-info">
                                    <div className="img-container">
                                        <img className='user-img' src={member.user.profileImg.image} alt="user icon" /> 
                                    </div>
                                    <span>{member.user.name + " " + member.user.surname}</span>
                                </div>                              
                            </div>) : ''
                        )
                    })   
                 )
              }) 
            }
            {
            groups == false ? <p>You have no groups</p> :
            groups.filter((item) => {
              return search.toLocaleLowerCase() === '' ? item : item.name.toLocaleLowerCase().includes(search);
              }).map((group, id) => {
              return (
                <div className={`user ${hidden == 'Chats' ? 'hidden' : ''}`} key={id} onClick={() => selectChat(group._id, group.name, '')}>
                    <div className="user-info">
                        <div className="img-container">
                            <img className='user-img' src={group.profileImg.image} alt="user icon" /> 
                        </div>
                        <span>{group.name}</span>
                    </div>                              
                </div>
              )
            })
            }
        </div>
    </div>
  )
}

export default ChatBar