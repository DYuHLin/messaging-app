import React from 'react'
import ReactDOM from 'react-dom/client'
import { userProvider } from './Context/UserContext.jsx'
import { Router } from './Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <userProvider>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </userProvider>
)
