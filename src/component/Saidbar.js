import React from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './sidebarData';
import { IconContext } from 'react-icons';
function Saidbar() {
  return (
    <>
    <IconContext.Provider value={{color:"#fff"}}>
        {/* <div className='sidebar'>
            <div className='menue-barss'>
            <Link to="#" ><AiOutlineDoubleRight /></Link>
            </div>
            <ul className='ek'>
                {SidebarData.map((item,index)=>{
                    return(
                        <li key={index} className='mobile'>
                            <Link to={item.path}>{item.icon}</Link>
                        </li>
                    )
                })}
            </ul>
        </div> */}
        <div className='abovenav'></div>
        <div className='sidebar'>
            <ul className='nav-menu-items' >
                <li className='navbar-toggle'>
                    <Link to="#" className='menu-bars'><img src='/img/logo.png'/></Link>
                </li>
                {SidebarData.map((item,index)=>{
                    return(
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>{item.icon}<span className='sidespan'>{item.title}</span></Link>
                        </li>
                    )
                })}
            </ul>
            <div className='profileSidebar'>
           <Link to="/pro"><img className='proimages' src='./img/propic/kira.png'/></Link> 
            <span className='pronamesidebar'>Kirubel</span>
            </div>
        </div>
       
        </IconContext.Provider>
    </>
  )
}

export default Saidbar