import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
import {jwtDecode} from 'jwt-decode'
import ImageUpload from '../Components/ImageUpload'

function CreateGroup() {
    const [name, setName] = useState('');
    const [hidden, setHidden] = useState('');
    const [group, setGroup] = useState('');
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState(false);
    const { user, imageInfo } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            const decoded = jwtDecode(user.accessToken);
            const group = {name: name, id: decoded.user._id, image: imageInfo};
            axios.post(`http://localhost:5000/api/group`, group, {headers: { "Content-Type": "application/json" }})
            .then(res => setGroup(res.data))
                .catch(err => console.log(err));

            axios({method: 'GET', url: `http://localhost:5000/api/register/getusers`}, {headers: { "Content-Type": "application/json" }})
                .then((res) => setUsers(res.data))
        }catch(err){
        console.log(err);
        };

        setHidden('hidden');
    };

    const addMembers = (id) => {
        const userAdd = {userId: id}
        axios.put(`http://localhost:5000/api/group/${group._id}/add`, userAdd, {headers: { "Content-Type": "application/json" }})
           .then(res => setStatus(res.data))
            .catch(err => console.log(err))
    };

    const show = () => {
        console.log(group)
    }

  return (
    <section>
        <h3>Create Group</h3>
        <form method='POST' onSubmit={handleSubmit} className={`register-form ${hidden}`}>
                <input type="text" required name='name' id='name' className='name' onChange={(e) => setName(e.target.value)} placeholder='Name'/>
                <ImageUpload />
                <button className='form-btn'>Create Group</button>
        </form>
        <div className="user-container">
            <div className="users">
            {
            users === false ? '':
                users.map((res, key) => {
                    return (
                            <div className="user" key={key}>
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
            </div>
        </div>
        <button onClick={show}>show</button>
        <Link to='/groups'>Done</Link>
    </section>
  )
}

export default CreateGroup