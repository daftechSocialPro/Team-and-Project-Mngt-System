import React, { useState } from 'react'
import { Ecard } from '../component/EmployeeCard/Ecard'
import { Link } from 'react-router-dom'
import CreateEmployee from './CreateEmployee'
import Saidbar from '../component/Saidbar'
import {  useSelector } from "react-redux";


const Employee = ({show}) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <>
      <Saidbar />
      <div className='header'>
        <div className='title'>Employess</div>
        <div className='rightHeader'>
          <div className="search">
            <div className="inp">
              <input type="text" placeholder="search" className="searchh" />
              <a href="#" className='searchicon'><img src="./img/search.svg" alt="" srcSet="" /></a>
            </div>

          </div>
          <div className="creatnew"> <Link href="#" onClick={() => setIsOpen(true)}> 
     

          <i className="pi pi-user-plus" style={{ color: '#06ecfe',fontSize:'30px' }}></i>
          
          </Link></div>
         
          <CreateEmployee open={isOpen} onClose={setIsOpen} show={show} user={user}>
            
          </CreateEmployee>
        </div>
      </div>

      <div className="line"></div>
      <Ecard />
    </>

  )
}

export default Employee