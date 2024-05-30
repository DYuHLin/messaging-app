import * as faIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import React from 'react'

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icons: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Users',
        path: '/users',
        icons: <IoIcons.IoMdChatboxes />,
        cName: 'nav-text'
    },
    {
        title: 'Friends',
        path: '/friends',
        icons: <faIcons.FaUserFriends />,
        cName: 'nav-text'
    },
    {
        title: 'Groups',
        path: '/groups',
        icons: <faIcons.FaLayerGroup/>,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/',
        icons: <IoIcons.IoMdLogOut />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/',
        icons: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
]