import { useState } from 'react'
import axios from 'axios'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function App() {

  return (
    <div className="root-layout">
      <main>
        <h1>hi</h1>
        <Outlet />
      </main>
    </div>
  )
}

export default App
