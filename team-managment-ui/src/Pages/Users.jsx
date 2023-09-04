import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Saidbar from '../component/Saidbar'
import CreateUser from './CreateUser'
import { getUserList } from '../api/authApi'
import { createImagePath } from "../api/commonApi";
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/loadingReducer'

function Users({ show }) {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([{}])
  const dispatch = useDispatch()

  const getImage = (imagePath) => {
    return createImagePath(imagePath);
  }; 

  useEffect(() => {
    getUsers()

  }, [onclose])
  const getUsers = async () => {
    dispatch(setLoading(true))
    const response = await getUserList();
    dispatch(setLoading(false))
    setUsers(response.data)
    console.log(response.data)

  }
  return (

    <>
      <Saidbar />
      <div className='header'>
        <div className='title'>Users</div>
        <div className='rightHeader'>
          <div className="search">
            <div className="inp">
              <input type="text" placeholder="search" className="searchh" />
              <a href="#" className='searchicon'><img src="./img/search.svg" alt="" srcSet="" /></a>
            </div>

          </div>
          <div className="creatnew">
            <Link href="#" onClick={() => setIsOpen(true)}>      <i className="pi pi-user-plus" style={{ color: '#06ecfe', fontSize: '30px' }}></i>
            </Link>
          </div>
          <CreateUser open={isOpen} onClose={() => setIsOpen(false)} show={show}>

          </CreateUser>
        </div>
      </div>

      <div className="line"></div>
      {/* <Ecard/> */}

      <div className="card-cont">
        {users.map((item, index) => (
          <div className="Ecard"  key={index}>
            <div className="card-image">
              <img src={getImage(item.imagePath)} alt="userpic" />
            </div>
            {/* <Button icon="pi pi-pencil" rounded text raised severity="warning" aria-label="edit" style={{ position: "absolute", top: "5px", right: "5px" }} className="" onClick={() => {
              setIsOpen(true);
              handleUpdate(item);
            }} /> */}
            <Link className="LINKE" to={`/empdetail/${item.id}`}>
              <p className="Ename">
                {item.name} 
              </p>
            </Link>
            <p className="email">{item.email}</p>
            {item.roles&& item.roles.map((role)=>
            
            <p className="occu" key={role.id}>{role.name}</p>
            ) }



          </div>
        ))}
   
      </div>
      
    </>
  )
}

export default Users