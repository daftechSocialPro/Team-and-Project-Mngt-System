import React, {useState} from 'react'
import {Ecard} from '../component/EmployeeCard/Ecard'
import { Link } from 'react-router-dom'
import Saidbar from '../component/Saidbar'
import CreateUser from './CreateEmployee'
function Users() {
  const [isOpen, setIsOpen] =useState(false);
  return (
    
    <>
    <Saidbar/>
    <div className='header'>
    <div className='title'>Users</div>
    <div className='rightHeader'>
    <div class="search">
            <div class="inp">
                <input type="text" placeholder="search" class="searchh"/>
            <a href="#" className='searchicon'><img src="./img/search.svg" alt="" srcSet=""/></a>
            </div>
            
        </div>
        <div class="creatnew"> <Link href="#" onClick={()=>setIsOpen(true)}> <img src="./img/add-user.png" alt="" srcSet=""/></Link></div>
        <CreateUser open={isOpen} onClose={()=>setIsOpen(false)}>

        </CreateUser>
    </div>
    </div>
    
    <div class="line"></div>
    <Ecard/>
    </>
  )
}

export default Users