import React from 'react'
import { EcardData } from './ecardData'
import { Link } from 'react-router-dom'
import './ecard.css'
 export const Ecard = () => {
  return (
    <>
    <div className='card-cont'>
   
                {EcardData.map((item,index)=>{
                    return(
                      <>
                       <div className='Ecard'>
                       <div className='card-image'>
                      <img src={item.image} alt='userpic'/>
                       </div>
                       <Link to="/empdetail"><p className='Ename'>{item.name}</p></Link>  
                       <p className='email'>{item.email}</p>
                       <p className='occu'>{item.occu}</p>
                       </div>
                      </>
                     
                    )
                })}
            
    </div>
    </>
  )
}


