import React, { useContext, useState } from 'react'
import axios from 'axios'
import * as IoIcons from 'react-icons/io'
import UserContext from '../Context/UserContext'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Friends() {
  const { user } = useContext(UserContext);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const decodedUser = jwtDecode(user.accessToken);

    const createChat = (userId) => {
        const decoded = jwtDecode(user.accessToken);
        axios.post('http://localhost:5000/api/chat', {user1: decoded.user._id, user2: userId}, {headers: {"Content-Type": "application/json"}});
        navigate('/');
        toast.success('Chat created');
    };

    const removeFriend = (userId) => {
        axios.put(`http://localhost:5000/api/register/${decodedUser.user._id}/deletefriend`, {friendId: userId}, {headers: {"Content-Type": "application/json"}});
        navigate('/');
        toast.success('Friend removed');
    };

  return (
    <section>
        <h1 className="register-title">Friends</h1>
        <div className="user-container">
            <div className="search-user">
                <input type="text" onChange={(e) => {setSearch(e.target.value)}} placeholder='Search friends'/>
            </div>
            <div className="users">
                {
                  decodedUser.user.friends === false ? (<p>There are no friends</p>):
                  decodedUser.user.friends < 0 ? (<p>There are no friends</p>):
                  decodedUser.user.friends.filter((item) => {
                    return search.toLocaleLowerCase() === '' ? item : item.user.name.toLocaleLowerCase().includes(search);
                    }).map((res, key) => {
                        return (
                            <div className="user" key={key}>
                                <div className="user-info">
                                    <div className="img-container">
                                        <img className='user-img' src={res.user.profileImg.image} alt="user icon" />
                                    </div>
                                    <span>{res.user.name + " " + res.user.surname}</span>
                                </div>
                                
                                    <div className={`user-options`}>                                   
                                    <ul className='options-user'>
                                        <li onClick={() => removeFriend(res.user._id)}><IoIcons.IoMdRemoveCircle /></li>
                                        <li onClick={() => createChat(res.user._id)}><IoIcons.IoMdChatbubbles /></li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Friends