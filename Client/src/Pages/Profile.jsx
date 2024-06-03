import React, { useContext, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import UserContext from '../Context/UserContext'
import { Link } from 'react-router-dom'

function Profile() {
  const { user } = useContext(UserContext);
  const [hidden, setHidden] = useState('hidden');
  const decoded = jwtDecode(user.accessToken);

  return (
    <section>
      <h1 className='register-title'>Profile</h1>
      <div className="admin-role">
        <p onClick={() => setHidden(hidden == 'hidden' ? '' : 'hidden')}>Delete Account</p>
        <Link to='/yourprofile/edit'>Edit Account</Link>
      </div>

      <div className={`delete-account ${hidden}`}>
        <p>Are you sure?</p>
        <button>Delete</button>
      </div>

      <div className="user-information">
        <div className="user-image">
          <img className='user-icon' src={decoded.user.profileImg.image} alt="user icon" />
        </div>
        <div className="user-details">
          <p>Name: {decoded.user.name}</p>
          <p>Surname: {decoded.user.surname}</p>
          <p>Email: {decoded.user.email}</p>
        </div>
      </div>
    </section>
  )
}

export default Profile