import { useState } from 'react'
import axios from 'axios'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './assets/Style.css'
import Sidebar from './Components/Sidebar'
import { io } from 'socket.io-client'

function App() {
  // const socket = io('http://localhost:5000')
  // socket.on(`connect`, () => {
  //   console.log(`you connected with id: ${socket.id}`)
  // })

  return (
    <div className="root-layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
