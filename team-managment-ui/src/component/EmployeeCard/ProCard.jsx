import React from 'react'
import './ecard.css'
import { createImagePath, calculateEmploymentLength } from "../../api/commonApi";
const ProCard = ({employee}) => {

   
    const getImage = (imagePath) => {
  
        return createImagePath(imagePath);
      };
  return (
    <>
    <div className=' top-content'>
    
        <>
          <div className='cardpro'>
            <div className='images imagepro'><img src={getImage(employee.imagePath)}  /></div>
            <div className='protite'>
            <h2 className='proname'>{employee.employeeName}</h2>
            <button className='probtn'>{employee.employmentStatus}</button>
            </div>
            
            <div className='firstpro'><h5 className='pro'>Position :<span>{employee.employmentPosition}</span></h5>
            <h5 className='pro'>Hire Date :<span>{employee.employmentDate}</span></h5>
            </div>
            <h5 className='pro'>Email:<span>{employee.email}</span></h5>
            <h5 className='pro'>Phone:<span>{employee.phoneNumber}</span></h5>
            {/* {calculateEmploymentLength(employee.employmentDate)} */}
            <h5 className='pro'>Worked For:<span>2 years and 5 month</span></h5>
            <div className='socials'>
               <a href=""><img className="soc" src="./img/telegram.png" alt="" srcSet="" /></a> 
                <a href=""><img className="soc" src="./img/facebook.png" alt="" srcSet="" /></a>
               <a href=""><img className="soc" src="./img/twitter.png" alt="" srcSet="" /></a> 
                <a href=""><img className="soc" src="./img/code.png" alt="" srcSet="" /></a>
            </div>
        </div> 
         <div className='rightcard'>
         <h2 className='proname2'>General Information</h2>
         <div className='uline'></div>
         <div className='generalContent'>
             <img className='icones' src='./img/date.png'></img>
             <h2 className='getitle'>Birth Date:</h2>
             <h2 className='gecontent'>{employee.birthDate}</h2>
         </div>
         <div className='generalContent'>
             <img className='icones' src='./img/sex.png' ></img>
             <h2 className='getitle'>Gender:</h2>
             <h2 className='gecontent'>{employee.gender}</h2>
         </div>
         <div className='generalContent'>
             <img className='icones' src='./img/time.png'></img>
             <h2 className='getitle'>Work Hours:</h2>
             <h2 className='gecontent'>Full-Time</h2>
         </div>
         <div className='generalContent'>
             <img className='icones' src='./img/loc.png'></img>
             <h2 className='getitle'>Address:</h2>
             <h2 className='gecontent'>{employee.address}</h2>
         </div>
 
         </div>
        </> 
       
        
        
       
       
    </div>
    </>
  )
}

export default ProCard