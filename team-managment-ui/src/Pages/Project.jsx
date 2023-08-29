import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import CreateProject from './CreateProject';
import Saidbar from '../component/Saidbar';
const Project = () => {
  const [isOpen, setIsOpen] =useState(false);
  return (
    <>
    <Saidbar/>
        <div className='header'>
    <div className='title'>Projects</div>
    <div className='rightHeader'>
    <div class="search">
            <div class="inp">
                <input type="text" placeholder="search" class="searchh"/>
            <a href="#" className='searchicon'><img src="./img/search.svg" alt="" srcSet=""/></a>
            </div>
            
        </div>
    </div>
    </div>
    
    <div class="line"></div>
<div className="projectContainer">
  <div className="Cpro" onClick={()=>setIsOpen(true)}>
  <span className="plus">+</span>
      <span className="createnew">Create New </span>
      <span className="createpro">Project</span>
  </div>

  <CreateProject open={isOpen} onClose={()=>setIsOpen(false)}>

  </CreateProject>
  <div className="projectcard">
  <div className="firstrow">
      <span className="proname">Daftech Water Meter </span>
      <img src="./img/add-user.png" alt="" className='add-member2'/> 
      </div>
        <div className="secondrow">
        <span className="proteam"><span className='teamtit'>Team:</span>Team DWM</span>
        <span className="descript"> <span className='teamtit'>Description:</span>  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up.</span>
        </div>
        <div className="thiredrow">
        <div className="proallpic proproject">
        <img src="./img/propic/aby.png" alt="" className="contproimg" />
        <img src="./img/propic/habte.png" alt="" className="contproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="contproimg3" />
        <img src="./img/propic/kira.png" alt="" className="contproimg4" />
        <div className="continuespan">
          <span className="spannumber">2+</span>
        </div>
        </div>
        <div className="completed"><span className="cospan">Completed</span></div>
        </div>
        <div className="forthrow">
<div className="pro-bar"></div>
<span className="pronumb">100%</span>
        </div>

  </div>
  <div className="projectcard">
  <div className="firstrow">
      <span className="proname">Daftech Water Meter </span>
      <img src="./img/add-user.png" alt="" className='add-member2'/> 
      </div>
        <div className="secondrow">
        <span className="proteam"><span className='teamtit'>Team:</span>Team DWM</span>
        <span className="descript"> <span className='teamtit'>Description:</span>  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up.</span>
        </div>
        <div className="thiredrow">
        <div className="proallpic proproject">
        <img src="./img/propic/aby.png" alt="" className="contproimg" />
        <img src="./img/propic/habte.png" alt="" className="contproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="contproimg3" />
        <img src="./img/propic/kira.png" alt="" className="contproimg4" />
        <div className="continuespan">
          <span className="spannumber">2+</span>
        </div>
        </div>
        <div className="completed"><span className="cospan">Completed</span></div>
        </div>
        <div className="forthrow">
<div className="pro-bar"></div>
<span className="pronumb">100%</span>
        </div>

  </div>
  <div className="projectcard">
  <div className="firstrow">
      <span className="proname">Daftech Water Meter </span>
      <img src="./img/add-user.png" alt="" className='add-member2'/> 
      </div>
        <div className="secondrow">
        <span className="proteam"><span className='teamtit'>Team:</span>Team DWM</span>
        <span className="descript"> <span className='teamtit'>Description:</span>  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up.</span>
        </div>
        <div className="thiredrow">
        <div className="proallpic proproject">
        <img src="./img/propic/aby.png" alt="" className="contproimg" />
        <img src="./img/propic/habte.png" alt="" className="contproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="contproimg3" />
        <img src="./img/propic/kira.png" alt="" className="contproimg4" />
        <div className="continuespan">
          <span className="spannumber">2+</span>
        </div>
        </div>
        <div className="completed"><span className="cospan">Completed</span></div>
        </div>
        <div className="forthrow">
<div className="pro-bar"></div>
<span className="pronumb">100%</span>
        </div>

  </div>
  <div className="projectcard">
  <div className="firstrow">
      <span className="proname">Daftech Water Meter </span>
      <img src="./img/add-user.png" alt="" className='add-member2'/> 
      </div>
        <div className="secondrow">
        <span className="proteam"><span className='teamtit'>Team:</span>Team DWM</span>
        <span className="descript"> <span className='teamtit'>Description:</span>  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up.</span>
        </div>
        <div className="thiredrow">
        <div className="proallpic proproject">
        <img src="./img/propic/aby.png" alt="" className="contproimg" />
        <img src="./img/propic/habte.png" alt="" className="contproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="contproimg3" />
        <img src="./img/propic/kira.png" alt="" className="contproimg4" />
        <div className="continuespan">
          <span className="spannumber">2+</span>
        </div>
        </div>
        <div className="completed"><span className="cospan">Completed</span></div>
        </div>
        <div className="forthrow">
<div className="pro-bar"></div>
<span className="pronumb">100%</span>
        </div>

  </div>
  <div className="projectcard">
  <div className="firstrow">
      <span className="proname">Daftech Water Meter </span>
      <img src="./img/add-user.png" alt="" className='add-member2'/> 
      </div>
        <div className="secondrow">
        <span className="proteam"><span className='teamtit'>Team:</span>Team DWM</span>
        <span className="descript"> <span className='teamtit'>Description:</span>  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up.</span>
        </div>
        <div className="thiredrow">
        <div className="proallpic proproject">
        <img src="./img/propic/aby.png" alt="" className="contproimg" />
        <img src="./img/propic/habte.png" alt="" className="contproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="contproimg3" />
        <img src="./img/propic/kira.png" alt="" className="contproimg4" />
        <div className="continuespan">
          <span className="spannumber">2+</span>
        </div>
        </div>
        <div className="completed"><span className="cospan">Completed</span></div>
        </div>
        <div className="forthrow">
<div className="pro-bar"></div>
<span className="pronumb">100%</span>
        </div>

  </div>
  <div className="projectcard">
  <div className="firstrow">
      <span className="proname">Daftech Water Meter </span>
      <img src="./img/add-user.png" alt="" className='add-member2'/> 
      </div>
        <div className="secondrow">
        <span className="proteam"><span className='teamtit'>Team:</span>Team DWM</span>
        <span className="descript"> <span className='teamtit'>Description:</span>  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up.</span>
        </div>
        <div className="thiredrow">
        <div className="proallpic proproject">
        <img src="./img/propic/aby.png" alt="" className="contproimg" />
        <img src="./img/propic/habte.png" alt="" className="contproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="contproimg3" />
        <img src="./img/propic/kira.png" alt="" className="contproimg4" />
        <div className="continuespan">
          <span className="spannumber">2+</span>
        </div>
        </div>
        <div className="completed"><span className="cospan">Completed</span></div>
        </div>
        <div className="forthrow">
<div className="pro-bar"></div>
<span className="pronumb">100%</span>
        </div>

  </div>
  <div className="projectcard">
  <div className="firstrow">
      <span className="proname">Daftech Water Meter </span>
      <img src="./img/add-user.png" alt="" className='add-member2'/> 
      </div>
        <div className="secondrow">
        <span className="proteam"><span className='teamtit'>Team:</span>Team DWM</span>
        <span className="descript"> <span className='teamtit'>Description:</span>  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up.</span>
        </div>
        <div className="thiredrow">
        <div className="proallpic proproject">
        <img src="./img/propic/aby.png" alt="" className="contproimg" />
        <img src="./img/propic/habte.png" alt="" className="contproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="contproimg3" />
        <img src="./img/propic/kira.png" alt="" className="contproimg4" />
        <div className="continuespan">
          <span className="spannumber">2+</span>
        </div>
        </div>
        <div className="completed"><span className="cospan">Completed</span></div>
        </div>
        <div className="forthrow">
<div className="pro-bar"></div>
<span className="pronumb">100%</span>
        </div>

  </div>
  <div className="projectcard">
  <div className="firstrow">
      <span className="proname">Daftech Water Meter </span>
      <img src="./img/add-user.png" alt="" className='add-member2'/> 
      </div>
        <div className="secondrow">
        <span className="proteam"><span className='teamtit'>Team:</span>Team DWM</span>
        <span className="descript"> <span className='teamtit'>Description:</span>  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up.</span>
        </div>
        <div className="thiredrow">
        <div className="proallpic proproject">
        <img src="./img/propic/aby.png" alt="" className="contproimg" />
        <img src="./img/propic/habte.png" alt="" className="contproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="contproimg3" />
        <img src="./img/propic/kira.png" alt="" className="contproimg4" />
        <div className="continuespan">
          <span className="spannumber">2+</span>
        </div>
        </div>
        <div className="completed"><span className="cospan">Completed</span></div>
        </div>
        <div className="forthrow">
<div className="pro-bar"></div>
<span className="pronumb">100%</span>
        </div>

  </div>
</div>

    </>
  )
}

export default Project