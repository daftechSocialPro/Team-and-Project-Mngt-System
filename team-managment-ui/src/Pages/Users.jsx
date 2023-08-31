import React, {useState} from 'react'
import {Ecard} from '../component/EmployeeCard/Ecard'
import { Link } from 'react-router-dom'
import Saidbar from '../component/Saidbar'
import CreateUser from './CreateUser'

function Users({show}) {
  const [isOpen, setIsOpen] =useState(false);
  return (
    
    <>
    <Saidbar/>
    <div className='header'>
    <div className='title'>Users</div>
    <div className='rightHeader'>
    <div className="search">
            <div className="inp">
                <input type="text" placeholder="search" className="searchh"/>
            <a href="#" className='searchicon'><img src="./img/search.svg" alt="" srcSet=""/></a>
            </div>
            
        </div>
        <div className="creatnew">
           <Link href="#" onClick={()=>setIsOpen(true)}>      <i className="pi pi-user-plus" style={{ color: '#06ecfe',fontSize:'30px' }}></i>
           </Link>
           </div>
        <CreateUser open={isOpen} onClose={()=>setIsOpen(false)} show={show}>

        </CreateUser>
    </div>
    </div>
    
    <div className="line"></div>
    {/* <Ecard/> */}
    </>
  )
}

export default Users