import { useState } from 'react'
import axios from 'axios'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './assets/Style.css'
import Sidebar from './Components/Sidebar'

function App() {
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
