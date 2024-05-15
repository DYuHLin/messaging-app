import React, { useState } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        //changes to the opposite of whatever boolean value is present
        setSidebar(!sidebar);
    };

  return (
    <>
    <div className="navbar">
        <Link to="/" className='menu-bars'>
            <faIcons.FaBars onClick={showSidebar}/>
        </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
            <li className="navbar-toggle">
                <Link to="" className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                </Link>
            </li>
            {SidebarData.map((item, index) => {
                return(
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icons}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </nav>
    </>
  )
}

export default Sidebar