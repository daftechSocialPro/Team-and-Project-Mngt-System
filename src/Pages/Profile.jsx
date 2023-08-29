import React from 'react'
import Saidbar from '../component/Saidbar'
const Profile = () => {
  return (
    <>
    <Saidbar/>
     <div className='header'>
    <div className='title'>Profile</div>
    <div className='rightHeader'>
    </div>
    </div>
    <div class="line"></div>
    <div className="profileContainer">
        <div className="profiles">
            <div className="profilerightt">
            <div className='imagess imageproo'><img src="./img/propic/kira.png" alt="" srcset="" /></div>
            <div className="pronext">
            <div className='protite'>
            <h2 className='proname' style={{fontSize:"18px"}}>Kirubel Gizaw</h2>
            </div>
            
            <div className='firstproo' style={{fontSize:"14px", marginBottom:"10px"}}><h5 className='proo'>Position:<span style={{fontSize:"16px"}}> Senior Developer</span></h5>
            </div>
            <h5 className='proo' style={{fontSize:"14px", marginBottom:"10px"}}>Email:<span> kirub1@gmail.com</span></h5>
            <h5 className='proo' style={{fontSize:"14px", marginBottom:"10px"}}>Phone:<span> +251925743700</span></h5>
            </div>
           
            </div>
            <div className="profileedit passeditt">
                  <button className='editbutton'> Edit</button>
                  <img className='editeimage' src="./img/edit.png" alt="" />
            </div>
      
        </div>
        <div className="profiles">
            <div className="profileright">
            <div className='profiletite'><h2 className='proname' style={{fontSize:"18px"}}>Personal Information</h2></div>
            <div className="personalcontainer">
            <div className="firstcolprofile">
            <h1 className="profilestitle">First Name</h1>
            <h1 className="profilestitles">Kirubel</h1>
            </div>
            <div className="firstcolprofile">
            <h3 className="profilestitle" style={{marginLeft:"-20px"}} >Last Name</h3>
            <h3 className="profilestitles" style={{marginLeft:"-20px"}} >Gizaw</h3>
            </div>
            
            </div>
            <div className="personalcontainer">
            <div className="firstcolprofile">
            <h1 className="profilestitle">Email</h1>
            <h1 className="profilestitles">kirub1@gmail.com</h1>
            </div>
            <div className="firstcolprofile">
            <h3 className="profilestitle" style={{marginLeft:"20px"}} >Phone</h3>
            <h3 className="profilestitles"style={{marginLeft:"20px"}}>+2519257456</h3>
            </div>
            
            </div>
            <div className="personalcontainer">
            <div className="firstcolprofile">
            <h1 className="profilestitle">Position</h1>
            <h1 className="profilestitles">Senior Developer</h1>
            </div>
            <div className="firstcolprofile">
            <h3 className="profilestitle">Address</h3>
            <h3 className="profilestitles">Kazanchis</h3>
            </div>
            
            </div>
            
     
          
            </div>
            <div className="profileedit">
                  <button className='editbutton'> Edit</button>
                  <img className='editeimage' src="./img/edit.png" alt="" />
            </div>
       
        </div>
        <div className="profiles passprof">
        <div className="profileright">
            <div className='profiletite'><h2 className='proname' style={{fontSize:"18px"}}>Password</h2></div>
        
            <div className="firstcolprofile">
            <h1 className="paswordprof">********************</h1>
            
            </div>
            </div>
            <div className="profileedit passedit">
                  <button className='editbutton'>Edit</button>
                  <img className='editeimage' src="./img/edit.png" alt="" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile