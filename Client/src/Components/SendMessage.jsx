import React, { useContext, useRef, useState } from 'react'
import * as faIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import axios from 'axios'
import UserContext from '../Context/UserContext'
import { jwtDecode } from 'jwt-decode'

function SendMessage({socket}) {
    const [link, setLink] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [hidden, setHidden] = useState('hidden');
    const [hide, setHide] = useState('');
    const currentMsg = useRef();

    const { user, setMessages, chat, chatId } = useContext(UserContext);

    const showLink = () => {
        if(hidden === 'hidden'){
          setHidden('');
          setHide('hidden');
        } else if(hidden === ''){
          setHidden('hidden');
          setHide('');
        }
      };
    
      const sendMessage = () => {
        try{
          const decoded = jwtDecode(user.accessToken);
          const messageSend = {id: decoded.user._id, chat: chat, image: image, message: content, video: link, date: Date.now()};
          axios.post(`http://localhost:5000/api/message`, messageSend, {headers: { "Content-Type": "application/json" }})
            .then((res) => {
              socket.emit('send_message', {message: res.data, chat: chatId.current})
              setMessages(content => [...content, res.data]);
              setContent('');
              setLink('');
              return () => socket.off("message");
            })
          
        }catch(err){
          console.log(err);
        };
      };

      const convertImage = (e) => {
        const data = new FileReader();
        data.addEventListener('load', () => {
        setImage(data.result);
      });
      data.readAsDataURL(e.target.files[0]);
      };

      const show = () => {
        console.log(image)
      }

  return (
    <div className="send-message">
        <input type="text" required name='name' id='name' className={`message-input ${hide}`} autoComplete='off' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Send a message'/>
        <input type="text" className={`${hidden}`} placeholder='Send a link' id='link' value={link} onChange={(e) => setLink(e.target.value)} autoComplete='off'/>
        <div className="img-upload">
        <label htmlFor="img" className='img-label'><faIcons.FaImage className='img-icon' /></label>
        <input type="file" name="img" id="img" onChange={convertImage}/>
        </div>
        <div className="img-upload">
        <label htmlFor="link" className='img-label' onClick={showLink}>{
        hidden == 'hidden' ? <faIcons.FaLink className='img-icon' /> : <faIcons.FaPenFancy className='img-icon' />}</label>
        </div>      
        <button className='send-message-btn' onClick={sendMessage}><IoIcons.IoMdSend className='img-icon' /></button>
    </div>
  )
}

export default SendMessage