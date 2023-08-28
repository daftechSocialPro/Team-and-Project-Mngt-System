import React, { useState } from 'react'
import {Ecard} from '../component/EmployeeCard/Ecard'
import { Link } from 'react-router-dom'
import CreateEmployee from './CreateEmployee'
const Employee = () => {
  const [isOpen, setIsOpen] =useState(false);

  return (
    <>
    <div className='header'>
    <div className='title'>Employess</div>
    <div className='rightHeader'>
    <div class="search">
            <div class="inp">
                <input type="text" placeholder="search" class="searchh"/>
            <a href="#" className='searchicon'><img src="./img/search.svg" alt="" srcset=""/></a>
            </div>
            
        </div>
        <div class="creatnew"> <Link href="#" onClick={()=>setIsOpen(true)}> <img src="./img/add-user.png" alt="" srcset=""/></Link></div>
        <CreateEmployee open={isOpen} onClose={()=>setIsOpen(false)}>
this
        </CreateEmployee>
    </div>
    </div>
    
    <div class="line"></div>
    <Ecard/>
    </>
    
  )
}

export default Employee