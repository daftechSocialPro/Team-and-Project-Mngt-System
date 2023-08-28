import React from 'react'
import './ecard.css'
const ProCard = () => {
  return (
    <>
    <div className=' top-content'>
        <div className='cardpro'>
            <div className='images imagepro'><img src="./img/propic/kira.png" alt="" srcset="" /></div>
            <div className='protite'>
            <h2 className='proname'>Kirubel Gizaw</h2>
            <button className='probtn'>Active</button>
            </div>
            
            <div className='firstpro'><h5 className='pro'>Position :<span>Senior Developer</span></h5>
            <h5 className='pro'>Hire Date :<span>February 14 2021</span></h5>
            </div>
            <h5 className='pro'>Email:<span>kirub1@gmail.com</span></h5>
            <h5 className='pro'>Phone:<span>+251925743700</span></h5>
            <h5 className='pro'>Worked For:<span>2 years 5 months</span></h5>
            <div className='socials'>
                <img className="soc" src="./img/telegram.png" alt="" srcset="" />
                <img className="soc" src="./img/facebook.png" alt="" srcset="" />
                <img className="soc" src="./img/twitter.png" alt="" srcset="" />
                <img className="soc" src="./img/code.png" alt="" srcset="" />
            </div>
        </div>
        <div className='rightcard'>
        <h2 className='proname2'>General Information</h2>
        <div className='uline'></div>
        <div className='generalContent'>
            <img className='icones' src='./img/date.png'></img>
            <h2 className='getitle'>Birth Date:</h2>
            <h2 className='gecontent'>9/14/ 2021</h2>
        </div>
        <div className='generalContent'>
            <img className='icones' src='./img/sex.png' ></img>
            <h2 className='getitle'>Gender:</h2>
            <h2 className='gecontent'>Male</h2>
        </div>
        <div className='generalContent'>
            <img className='icones' src='./img/time.png'></img>
            <h2 className='getitle'>Work Hours:</h2>
            <h2 className='gecontent'>Full-Time</h2>
        </div>
        <div className='generalContent'>
            <img className='icones' src='./img/loc.png'></img>
            <h2 className='getitle'>Address:</h2>
            <h2 className='gecontent'>Kazanchiz </h2>
        </div>

        </div>
    </div>
    </>
  )
}

export default ProCard