import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import UserContext from './Context/UserContext'
import App from './App';
import Home from './Pages/Home';

function Router() {
    const { user } = useContext(UserContext);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />}>
                <Route index element={<Home />}/>
            </Route>
        )
    )
  return <RouterProvider router = {router}/>
}

export default Router