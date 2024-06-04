import React, { useContext, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import UserContext from '../Context/UserContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ImageUpload from '../Components/ImageUpload'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user, imageInfo } = useContext(UserContext);
  const [hidden, setHidden] = useState('hidden');
  const [image, setImage] = useState(false);
  const [img, setImg] = useState(false);
  const decoded = jwtDecode(user.accessToken);

  const navigate = useNavigate();

  const updateImg = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/register/${decoded.user._id}/updateimg`, {imageId: image._id}, {headers: {"Content-Type": "application/json"}});
    navigate('/');
  };

  const convertBase64 = (e) => {
    const data = new FileReader();
    data.addEventListener('load', () => {
      setImg(data.result);
      axios.post('http://localhost:5000/api/postimage', {image: data.result}, {headers: { "Content-Type": "application/json" }})
      .then((res) => {setImage(res.data)})
    });
    data.readAsDataURL(e.target.files[0]);
  };

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
          <div className="update-img">

            <form method='PUT' className='update-pic' onSubmit={updateImg}>
              <input type="file" lable="Image" name="myFile" id="file-upload" accept='.jpeg, .png, .jpg' onChange={convertBase64}/>
              <button type='submit' className='form-btn'>Update</button>
            </form>

          </div>
        </div>
        <div className="user-details">
          <p>Name: {decoded.user.name}</p>
          <p>Surname: {decoded.user.surname}</p>
          <p>Email: {decoded.user.email}</p>
        </div>
      </div>
      <button onClick={() => console.log(imageInfo)}>show</button>
    </section>
  )
}

export default Profile