import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UsersList() {
    const [users, setUsers] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios({method: 'GET', url: `http://localhost:5000/api/register/users`}, {headers: { "Content-Type": "application/json" }})
            .then((res) => setUsers(res.data))
    },[]);

    const show = () => {
        console.log(users)
    }

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
                            <div className="user">
                                <img src={res.profileImg.image} alt="user icon" />
                                <span>{res.name + " " + res.surname}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <button onClick={show}>show</button>
    </section>
  )
}

export default UsersList