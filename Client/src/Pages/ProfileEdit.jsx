import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import ImageUpload from '../Components/ImageUpload'
import axios from 'axios'
import {toast} from 'react-toastify'

function ProfileEdit() {
    const { user } = useContext(UserContext);
    const decoded = jwtDecode(user.accessToken);

    const [name, setName] = useState(decoded.user.name);
    const [surname, setSurname] = useState(decoded.user.surname);
    const [email, setEmail] = useState(decoded.user.email);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        const newName = name.replace(/\s/g, "");
    const newSurname = surname.replace(/\s/g, "");

    const updated = {name: newName, surname: newSurname, email, password, confirmedPassword};

    try{
          axios.put(`http://localhost:5000/api/register/${decoded.user._id}`, updated, {headers: { "Content-Type": "application/json" }})
           .then(res => res.data)
           .then(status => {
            if(status === "failed"){
              setError("This username already exists.");
              toast.error("There was an error");
            } else if(status === "match"){
              setError("your passwords do not match.");
              toast.error("There was an error");
            } else if(status === "ok"){
              navigate("/");
              toast.success("You have registered successfully");
            };
            console.log(status)
          })
           .catch(err => console.log(err))
    }catch(err){
      console.log(err);
    };  
    };
  return (
    <section>
        <h1 className="register-title">Edit your details</h1>

        <form method='PUT' className='register-form' onSubmit={submitForm}>
        <input type="text" required name='name' id='name' className='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'/>
        <input type="text" required name='surname' id='surname' className='surname' value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Surname'/>
        <input type="email" required name='email' id='email' className='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
        <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)} placeholder='New password' minLength={6}/>
        <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword' placeholder='Confirm password' onChange={(e) => setConfirmedPassword(e.target.value)} minLength={6}/>

        <button type='submit' className='form-btn'>Submit</button>
        </form>
    </section>
  )
}

export default ProfileEdit