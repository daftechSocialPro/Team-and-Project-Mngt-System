import React from 'react'
import {Ecard} from '../component/EmployeeCard/Ecard'
import { Link } from 'react-router-dom'
function Users() {
  return (
    <>
    <div className='header'>
    <div className='title'>Users</div>
    <div className='rightHeader'>
    <div class="search">
            <div class="inp">
                <input type="text" placeholder="search" class="searchh"/>
            <a href="#" className='searchicon'><img src="./img/search.svg" alt="" srcset=""/></a>
            </div>
            
        </div>
        <div class="creatnew"> <Link href="#"> <img src="./img/add-user.png" alt="" srcset=""/></Link></div>
    </div>
    </div>
    
    <div class="line"></div>
    <Ecard/>
    </>
  )
}

export default Users