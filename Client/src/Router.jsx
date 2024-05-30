import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import UserContext from './Context/UserContext'
import App from './App';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UsersList from './Pages/UsersList';
import Friends from './Pages/Friends';
import Group from './Pages/Group';
import CreateGroup from './Pages/CreateGroup';

function Router() {
    const { user, ProtectedRoutes } = useContext(UserContext);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />}>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
                <Route element={<ProtectedRoutes />}>
                    <Route index element={<Home />}/>
                    <Route path='/:id' element={<Home />}/>
                    <Route path='/users' element={<UsersList />}/>
                    <Route path='/friends' element={<Friends />}/>
                    <Route path='/groups' element={<Group />}/>
                    <Route path='/creategroup' element={<CreateGroup />}/>
                </Route>
            </Route>
        )
    )
  return <RouterProvider router = {router}/>
}

export default Router