import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as IoIcons from 'react-icons/io'
import * as faIcons from 'react-icons/fa'
import UserContext from '../Context/UserContext'
import {jwtDecode} from 'jwt-decode'

function Friends() {
  const { user } = useContext(UserContext);
    const [users, setUsers] = useState(false);
    const [search, setSearch] = useState('');
    const decodedUser = jwtDecode(user.accessToken);
    useEffect(() => {

        axios({method: 'GET', url: `http://localhost:5000/api/register/${decodedUser.user._id}`}, {headers: { "Content-Type": "application/json" }})
            .then((res) => setUsers(res.data))
    },[]);

    const createChat = (userId) => {
        const decoded = jwtDecode(user.accessToken);
        axios.post('http://localhost:5000/api/chat', {user1: decoded.user._id, user2: userId}, {headers: {"Content-Type": "application/json"}})
        axios.put('http://localhost:5000/api/register/deletefriend', {userId: decoded.user._id, friendId: userId}, {headers: {"Content-Type": "application/json"}})
    };

    const removeFriend = (userId) => {
        const decoded = jwtDecode(user.accessToken);
    };
// console.log(users)
  return (
    <section>
        <h1 className="register-title">Friends</h1>
        <div className="user-container">
            <div className="search-user">

            </div>
            <div className="users">
                {
                  users === false ? (<p>There are no friends</p>):
                    users.friends.length < 0 ? (<p>There are no friends</p>):
                    users.friends.map((res, key) => {
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