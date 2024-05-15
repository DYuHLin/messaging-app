import React, { useState } from 'react'
import axios from 'axios'

function ImageUpload() {
    const [img, setImg] = useState('')

    const convertBase64 = (e) => {
      const data = new FileReader();
      data.addEventListener('load', () => {
        setImg(data.result);
      });
      data.readAsDataURL(e.target.files[0]);
    };
  
    const handleSubmit = async () => {
      try{
        const subImg = {image: img};
        axios.post('http://localhost:5000/api/postimage', subImg);
      }catch(err){
        console.log(err);
      }
      
    };
  
    const show = () => {
      console.log(img)
    }
  
    return (
      <section>
        <h1>Hello</h1>
        <form method='POST' onSubmit={handleSubmit}>
          <input type="file" lable="Image" name="myFile" id="file-upload" accept='.jpeg, .png, .jpg' onChange={convertBase64}/>
  
          <button type='submit'>Submit</button>
        </form>
        <button onClick={show}>show</button>
      </section>
    )
}

export default ImageUpload