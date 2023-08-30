import React from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './sidebarData';
import { IconContext } from 'react-icons';
import {FiLogOut} from 'react-icons/fi'
const SIDBAR={
    backgroundColor: "#161616",
    width: "200px",
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    transition: "850ms"
}
const NAvLogo={
    width: "100%",
    maxWidth:"200px"
   
}
function Saidbar() {
  return (
    <>
    <IconContext.Provider value={{color:"#fff"}}>
        {/* <div className='abovenav'></div>
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
        </div> */}
                
        <div style={SIDBAR}>
            <ul>
                <li>
                    <Link to="#"><img src='/img/logo.png' style={NAvLogo}/></Link>
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
            
            <div className='profileSidebar'>
           <Link to="/pro"><FiLogOut/></Link> 
            <span className='pronamesidebar'>Logout</span>
            </div>
        </div>
       
        </IconContext.Provider>
    </>
  )
}

export default Saidbar