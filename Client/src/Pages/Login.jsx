import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import UserContext from '../Context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:5000/api/login`, {email, password}, {headers: { "Content-Type": "application/json" }});
      if(res.data === "name"){
        setError("This email does not exist.");
        toast.error("There was an error");
      } else if(res.data === "password"){
        setError("Your password is incorrect");
        toast.error("There was an error");
      } else {
        setUser(res.data);
        navigate('/');
        toast.success("You have logged in successfully");
      };
      
    }catch(err){
      console.log(err);
    };
  };

  return (
    <section>
      <h1 className='register-title'>Login</h1>
      <form method="POST" className='register-form' onSubmit={handleSubmit}>
          <input type="text" required name='email' id='email' className='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
          <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <button className='form-btn'>Login</button>
        </form>
        <p className="error">{error}</p>
      <Link to='/register'>Register</Link>
    </section>
  )
}

export default Login