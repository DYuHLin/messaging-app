import React, { useState } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import * as faIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import * as RiIcons from 'react-icons/ri'
import { IconContext } from 'react-icons/lib'

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        //changes to the opposite of whatever boolean value is present
        setSidebar(!sidebar);
    };

  return (
    <>
    <IconContext.Provider value={{color: '#fff'}}>
        <div className="navbar">
            <Link to="#" className='menu-bars'>
                <RiIcons.RiArrowRightDoubleFill onClick={showSidebar}/>
            </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                    <Link to="#" className='menu-bars'>
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
    </IconContext.Provider>
    </>
  )
}

export default Sidebar