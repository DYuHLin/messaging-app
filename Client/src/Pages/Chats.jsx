import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from '../Context/UserContext'
import {jwtDecode} from 'jwt-decode'

function Chats() {
    const [chats, setChats] = useState(false);
    const [groups, setGroups] = useState(false);
    const [search, setSearch] = useState('');
    const [searchGroups, setSearchGroups] = useState('');
    const [hidden, setHidden] = useState('Chats');
    const { user, setChat, setMessages, messages, chatId } = useContext(UserContext);
    const decoded = jwtDecode(user.accessToken);
    const navigate = useNavigate();
  
    useEffect(() => {
            axios({method: "GET", url: `http://localhost:5000/api/chat/${decoded.user._id}`}, {headers: {"Content-Type": "application/json"}})
            .then(res => setChats(res.data)
            ).catch(err => console.log(err));  
      },[]);

      useEffect(() => {
            axios({method: 'GET', url: `http://localhost:5000/api/group/${decoded.user._id}/getgroups`}, {headers: { "Content-Type": "application/json" }})
            .then((res) => setGroups(res.data))
      },[]);

      const selectChat = (id) => {
        setChat(id);
        chatId.current = id;
        axios({method: "GET", url: `http://localhost:5000/api/message/${id}`}, {headers: {"Content-Type": "application/json"}})
            .then(res => setMessages(res.data)
            ).catch(err => console.log(err));
        navigate('/'); 
      };

  return (
    <section>
        <h1 className="register-title">Chats and group chats</h1>
        <div className="user-container">
          <h3>Chats</h3>
            <div className="search-user">
                <input type="text" onChange={(e) => {setSearch(e.target.value)}} placeholder='Search chats'/>
            </div>
            <div className="users">
                {
                chats === false ? (<p>There are no users</p>):
                chats.filter((item) => {
                  return search.toLocaleLowerCase() === '' ? item : item.creator.name.toLocaleLowerCase().includes(search) || item.user.name.toLocaleLowerCase().includes(search);
                }).map((chat, id) => {
                  return(
                    chat.user._id == decoded.user._id ? (
                            <div className={`user`} key={id} onClick={() => selectChat(chat._id)}>
                                <div className="user-info">
                                    <div className="img-container">
                                        <img className='user-img' src={chat.creator.profileImg.image} alt="user icon" /> 
                                    </div>
                                    <span>{chat.creator.name + " " + chat.creator.surname}</span>
                                </div>                              
                            </div>
                    ) : chat.creator._id == decoded.user._id ? (
                            <div className={`user`} key={id} onClick={() => selectChat(chat._id)}>
                                <div className="user-info">
                                    <div className="img-container">
                                        <img className='user-img' src={chat.user.profileImg.image} alt="user icon" /> 
                                    </div>
                                    <span>{chat.user.name + " " + chat.user.surname}</span>
                                </div>                              
                            </div>
                    ): ''
                )
              })
              }
          </div>
          <h3>Groups</h3>
          <div className="search-user">
            <input type="text" onChange={(e) => {setSearchGroups(e.target.value)}} placeholder='Search Groups'/>
          </div>
          {groups == false ? <p>You have no groups</p> :
            groups.filter((item) => {
              return searchGroups.toLocaleLowerCase() === '' ? item : item.name.toLocaleLowerCase().includes(searchGroups);
              }).map((group, id) => {
              return (
                <div className={`user`} key={id} onClick={() => selectChat(group._id)}>
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
    </section>
  )
}

export default Chats