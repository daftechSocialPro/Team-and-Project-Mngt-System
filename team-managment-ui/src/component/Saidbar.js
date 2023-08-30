import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom'
import { SidebarData } from './sidebarData';
import { IconContext } from 'react-icons';
import {FiLogOut} from 'react-icons/fi'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
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

    const user = useSelector((state) => state.user);
    const toast = useRef(null);
    const dispatch=useDispatch();
    const show = (severity, summary, message) => {
      toast.current.show({
        severity: severity,
        summary: summary,
        detail: message,
      });
    };
  
    const navigate = useNavigate();
  
    const handleLogOut = async (e) => {
      e.preventDefault();
    
      try {
        sessionStorage.removeItem("token");
        dispatch({type:"LOGOUT"})
        navigate("/login");
        
      } catch (error) {
        // show('error','ERROR',userData.message)
      }
    };
  return (
    <>
      <Toast ref={toast} />
    <IconContext.Provider value={{color:"#fff"}}>              
        <div style={SIDBAR}>
            <ul>
                <li>
                    <Link to="#"><img src='/img/logo.png' style={NAvLogo}/></Link>
                </li>
                {SidebarData.map((item,index)=>{
                    return(
                        <li key={index} className={item.cName}>
                            <Link to={item.path}><span className='iconcustom'> {item.icon}</span><span className='sidespan'>{item.title}</span></Link>
                        </li>
                    )
                })}
            </ul>
            <div className='profileSidebar'>
           <Link to="/pro"><img className='proimages' src='./img/propic/kira.png'/></Link> 
            <span className='pronamesidebar'>{user.user&& user.user.fullName}</span>
            </div>
            
            <div className='profileSidebar2' onClick={handleLogOut}>
           <Link to="/pro"><FiLogOut/></Link> 
            <span className='pronamesidebar'>Logout</span>
            </div>
        </div>
       
        </IconContext.Provider>
    </>
  )
}

export default Saidbar