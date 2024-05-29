import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as IoIcons from 'react-icons/io'
import * as faIcons from 'react-icons/fa'
import UserContext from '../Context/UserContext'
import {jwtDecode} from 'jwt-decode'

function UsersList() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios({method: 'GET', url: `http://localhost:5000/api/register/users`}, {headers: { "Content-Type": "application/json" }})
            .then((res) => setUsers(res.data))
    },[]);

    const createChat = (userId) => {
        const decoded = jwtDecode(user.accessToken);
        axios.post('http://localhost:5000/api/chat', {user1: decoded.user._id, user2: userId}, {headers: {"Content-Type": "application/json"}})
    };

    const addFriend = (userId) => {
        const decoded = jwtDecode(user.accessToken);
        axios.put('http://localhost:5000/api/register/addfriend', {userId: decoded.user._id, friendId: userId}, {headers: {"Content-Type": "application/json"}})
    };

  return (
    <section>
        <h1 className="register-title">Users</h1>
        <div className="user-container">
            <div className="search-user">

            </div>
            <div className="users">
                {
                    users === false ? (<p>There are no users</p>):
                    users.map((res, key) => {
                        return (
                            <div className="user" key={key}>
                                <div className="user-info">
                                    <div className="img-container">
                                        <img className='user-img' src={res.profileImg.image} alt="user icon" />
                                    </div>
                                    <span>{res.name + " " + res.surname}</span>
                                </div>
                                
                                    <div className={`user-options`}>                                   
                                    <ul className='options-user'>
                                        <li onClick={() => addFriend(res._id)}><faIcons.FaUserFriends /></li>
                                        <li onClick={() => createChat(res._id)}><IoIcons.IoMdChatbubbles /></li>
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

export default UsersList