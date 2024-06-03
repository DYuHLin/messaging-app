import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext';
import {jwtDecode} from 'jwt-decode'
import ImageUpload from '../Components/ImageUpload';

function ProfileEdit() {
    const { imageInfo, user } = useContext(UserContext);
    const decoded = jwtDecode(user.accessToken);

    const [name, setName] = useState(decoded.user.name);
    const [surname, setSurname] = useState(decoded.user.surname);
    const [email, setEmail] = useState(decoded.user.email);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
  return (
    <section>
        <h1 className="register-title">Edit your details</h1>

        <form method='PUT' className='register-form'>
        <input type="text" required name='name' id='name' className='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'/>
        <input type="text" required name='surname' id='surname' className='surname' value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Surname'/>
        <input type="email" required name='email' id='email' className='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
        <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)} placeholder='New password' minLength={6}/>
        <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword' placeholder='Confirm password' onChange={(e) => setConfirmedPassword(e.target.value)} minLength={6}/>
        <ImageUpload />
        </form>
    </section>
  )
}

export default ProfileEdit