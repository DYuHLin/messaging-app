import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

function Group() {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState(false);
  const decoded = jwtDecode(user.accessToken);

  useEffect(() => {
    axios({method: 'GET', url: `http://localhost:5000/api/group/${decoded.user._id}/getgroups`}, {headers: { "Content-Type": "application/json" }})
        .then((res) => setGroups(res.data))
},[]);

const show = () => {
  console.log(groups)
}

  return (
    <section>
      <h1>Group</h1>
      <Link to='/creategroup'>Create Group</Link>
      <div className="user-container">
        <div className="users">
          {
            groups == false ? <p>You have no groups</p> :
            groups.map((group, index) => {
              return (
                <Link key={index} to={`/groups/${group._id}`}>
                  <div className="user">
                    <div className="user-info">
                      <div className="img-container">
                        <img className='user-img' src={group.profileImg.image} alt="user icon" />
                      </div>
                        
                      <span>{group.name}</span>
                    </div> 
                    <p>Created by: {group.creator.name + " " + group.creator.surname}</p>      
                    </div>
                </Link>
              )
            })
            }
        </div>
      </div>
        <button onClick={show}>show</button>
    </section>
  )
}

export default Group