import React from 'react'
import { BsGridFill } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import {FaUsers}  from 'react-icons/fa';
import { AiOutlineUser, AiFillFolder} from 'react-icons/ai';

export const SidebarData=[
    {
        title:'Dashboard',
        path:'/',
        icon:  <BsGridFill/>,
        cName:'nav-text'
    },
    {
        title:'Project',
        path:'/project',
        icon:<AiFillFolder/>,
        cName:'nav-text'
    },
    {
        title:'Team',
        path:'/team',
        icon:<FiUsers/>,
        cName:'nav-text'
    },
    {
        title:'Employee',
        path:'/employee',
        icon:<AiOutlineUser/>,
        cName:'nav-text'
    },
    {
        title:'Manage Users',
        path:'/users',
        icon:<FaUsers/>,
        cName:'nav-text'
    }
]