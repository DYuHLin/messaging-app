import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import * as IoIcons from 'react-icons/io'
import * as faIcons from 'react-icons/fa'
import UserContext from '../Context/UserContext'
import { jwtDecode } from 'jwt-decode'

function GroupPage() {
  const [group, setGroup] = useState(false);
  const [users, setUsers] = useState(false);
  const [hidden, setHidden] = useState('hidden');
  const { user } = useContext(UserContext);
  const decodedUser = jwtDecode(user.accessToken);

  const id = useParams();

  const addMembers = (id) => {
    const userAdd = {userId: id}
    axios.put(`http://localhost:5000/api/group/${group._id}/add`, userAdd, {headers: { "Content-Type": "application/json" }})
       .then(res => setStatus(res.data))
        .catch(err => console.log(err));
};

const deleteGroup = () => {
  axios.put(`http://localhost:5000/api/group/${group._id}/deletechat`, userAdd, {headers: { "Content-Type": "application/json" }})
        .catch(err => console.log(err));
};

const leaveGroup = (id) => {
  axios.put(`http://localhost:5000/api/group/${id}/delete`, userAdd, {headers: { "Content-Type": "application/json" }})
        .catch(err => console.log(err));
};

const removeUser = (id) => {
  axios.put(`http://localhost:5000/api/group/${id}/delete`, userAdd, {headers: { "Content-Type": "application/json" }})
        .catch(err => console.log(err));
};

  useEffect(() => {
    axios({method: 'GET', url: `http://localhost:5000/api/group/${id.id}`}, {headers: { "Content-Type": "application/json" }})
        .then((res) => setGroup(res.data));

    axios({method: 'GET', url: `http://localhost:5000/api/register/getusers`}, {headers: { "Content-Type": "application/json" }})
      .then((res) => setUsers(res.data))
},[]);
  console.log(group)
  return (
    <section>
      <h2>{group.name}</h2>
      {
      group === false ? '' : decodedUser.user._id === group.creator._id ? <div className="admin-role">
        <p onClick={() => createChat(member.user._id)}>Delete group</p>
        <p onClick={() => setHidden(hidden == 'hidden' ? '' : 'hidden')}>Add Member</p>
      </div>   :
      <p onClick={() => createChat(member.user._id)}>Leave group</p>
      }   
      <div className="user-container">
        <div className="users">
        <h3 className={`${hidden}`}>Add Users</h3>
            {
            users === false ? '':
              users.map((res, key) => {
                return (
                  <div className={`user ${hidden}`} key={key}>
                    <div className="user-info">
                      <div className="img-container">
                        <img className='user-img' src={res.profileImg.image} alt="user icon" />
                      </div>
                      <span>{res.name + " " + res.surname}</span>
                    </div>                                              
                      <ul className='options-user'>
                        <li onClick={() => addMembers(res._id)}><faIcons.FaPlus /></li> 
                      </ul>
                  </div>
                )
            })
            }
            <h3>Members</h3>
          {
            group === false ? '' :
            group.members < 0 ? <p>There are no group members</p> :
            group.members.map((member, index) => {
              return (
                <div className="user" key={index}>
                  <div className="user-info">
                    <div className="img-container">
                      <img className='user-img' src={member.user.profileImg.image} alt="user icon" /> 
                    </div>
                    <span>{member.user.name + " " + member.user.surname}</span>
                  </div>   
                  {
                      decodedUser.user._id !== group.creator._id ? "" :
                      <ul className='options-user'>
                        <li onClick={() => createChat(member.user._id)}><IoIcons.IoMdRemoveCircle /></li>
                      </ul>
                  }                                                       
                </div>
              )
            })
            }
        </div>
      </div>
    </section>
  )
}

export default GroupPage