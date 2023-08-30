import React from 'react'
import { Link } from 'react-router-dom'
import DashCard from '../component/Dashbordcomp/DashCard'
import Saidbar from '../component/Saidbar'
const Dashboard = () => {
  return (
    <>
    <Saidbar/>
       <div className='header'>
    <div className='title'>Dashboard</div>
    <div className='rightHeader'>
    <div className="search">
            <div className="inp">
                <input type="text" placeholder="search" className="searchh"/>
            <a href="#" className='searchicon'><img src="./img/search.svg" alt="" srcSet=""/></a>
            </div>
            
        </div>
       
    </div>
    </div>
    
    <div className="line"></div>
   <div className="dashbordcontainer">
    <div className="bashbordleftcont">
        <div className="leftcontupper">
            <div className="dashboardsmallcard">  
            <div className="cardrigh">
                    <span className="dashnum">5</span>
                    <div className="dashh2">All Project</div>
                    <div className="prog">
                        <img className="arrowimg" src="./img/downar.png" alt="" srcSet=""/>
                        <span className="dashh3">37.5%</span>
                    </div>
                </div>
                 <div className="cardleft">
                    <img className="barimg" src="./img/bar2.png" alt=""/>
                </div>
                </div>
            <div className="dashboardsmallcard">
            <div className="cardrigh">
                    <span className="dashnum" style={{color:"#F0C033"}}>2</span>
                    <div className="dashh2">Completed</div>
                    <div className="prog">
                        <img className="arrowimg" src="./img/downar.png" alt="" srcSet=""/>
                        <span className="dashh3">37.5%</span>
                    </div>
                </div>
                 <div className="cardleft">
                    <img className="barimg" src="./img/bar3.png" alt=""/>
                </div>
            </div>
            <div className="dashboardsmallcard">
            <div className="cardrigh">
                    <span className="dashnum"  style={{color:"#FF5722"}}>3</span>
                    <div className="dashh2">Pending</div>
                    <div className="prog">
                        <img className="arrowimg" src="./img/downar.png" alt="" srcSet=""/>
                        <span className="dashh3">37.5%</span>
                    </div>
                </div>
                 <div className="cardleft">
                    <img className="barimg" src="./img/bar1.png" alt=""/>
                </div>
            </div>
            <div className="dashboardsmallcard">
            <div className="cardrigh dashemployee">
                    <span className="dashnum">25</span>
                    <div className="dashh2">Employees</div>
                    <div className="proallpic dashallpic">
        <img src="./img/propic/aby.png" alt="" className="contproimg" />
        <img src="./img/propic/habte.png" alt="" className="contproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="contproimg3" />
        <img src="./img/propic/kira.png" alt="" className="contproimg4" />
        <div className="continuespan">
          <span className="spannumber">2+</span>
        </div>
        
        </div>
                </div>
                <div className="cardleft">
                    {/* <img className="barimg" src="./img/bar1.png" alt=""/> */}
                </div>
            </div>
        </div>
        <div className="leftlower">
            <div className="dafflowertable">
            <table>
        <tr className='trr'>
            <th className='thh'>No</th>
            <th className='thh'>Project Name</th>
            <th className='thh'>Project Owner</th>
            <th className='thh'>Team</th>
            <th className='thh'>Assigned Date</th>
            <th className='thh'>Due Date</th>
            <th className='thh'>Project Progress</th>
        </tr>
        <tr className='trr'>
            <td className='tdd'>1</td>
            <td className='tdd'>Fasil Web Portal</td>
            <td className='tdd'>Fasil FC</td>
            <td className='tdd'>  <div className="tableteam">
        <img src="./img/propic/habte.png" alt="" className="dashproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="dashproimg3" />
        <img src="./img/propic/kira.png" alt="" className="dashproimg4" />
        <div className="continuespann">
          <span className="spannumber">2+</span>
        </div>
        
        </div>
        </td>
            <td className='tdd'>19/7/2023</td>
            <td className='tdd'>2/8/2023</td>
            <td className='tdd'>Test</td>
        </tr>
        <tr className='trr'>
            <td className='tdd'>2</td>
            <td className='tdd'>Fasil Web Portal</td>
            <td className='tdd'>Fasil FC</td>
            <td className='tdd'>  <div className="tableteam">
        <img src="./img/propic/habte.png" alt="" className="dashproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="dashproimg3" />
        <img src="./img/propic/kira.png" alt="" className="dashproimg4" />
        <div className="continuespann">
          <span className="spannumber">2+</span>
        </div>
        
        </div>
        </td>
            <td className='tdd'>19/7/2023</td>
            <td className='tdd'>2/8/2023</td>
            <td className='tdd'>Test</td>
        </tr>
        <tr className='trr'>
            <td className='tdd'>3</td>
            <td className='tdd'>Fasil Web Portal</td>
            <td className='tdd'>Fasil FC</td>
            <td className='tdd'>  <div className="tableteam">
        <img src="./img/propic/habte.png" alt="" className="dashproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="dashproimg3" />
        <img src="./img/propic/kira.png" alt="" className="dashproimg4" />
        <div className="continuespann">
          <span className="spannumber">2+</span>
        </div>
        
        </div>
        </td>
            <td className='tdd'>19/7/2023</td>
            <td className='tdd'>2/8/2023</td>
            <td className='tdd'>Test</td>
        </tr>
        <tr className='trr'>
            <td className='tdd'>4</td>
            <td className='tdd'>Fasil Web Portal</td>
            <td className='tdd'>Fasil FC</td>
            <td className='tdd'>  <div className="tableteam">
        <img src="./img/propic/habte.png" alt="" className="dashproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="dashproimg3" />
        <img src="./img/propic/kira.png" alt="" className="dashproimg4" />
        <div className="continuespann">
          <span className="spannumber">2+</span>
        </div>
        
        </div>
        </td>
            <td className='tdd'>19/7/2023</td>
            <td className='tdd'>2/8/2023</td>
            <td className='tdd'>Test</td>
        </tr>
        <tr className='trr'>
            <td className='tdd'>5</td>
            <td className='tdd'>Fasil Web Portal</td>
            <td className='tdd'>Fasil FC</td>
            <td className='tdd'>  <div className="tableteam">
        <img src="./img/propic/habte.png" alt="" className="dashproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="dashproimg3" />
        <img src="./img/propic/kira.png" alt="" className="dashproimg4" />
        <div className="continuespann">
          <span className="spannumber">2+</span>
        </div>
        
        </div>
        </td>
            <td className='tdd'>19/7/2023</td>
            <td className='tdd'>2/8/2023</td>
            <td className='tdd'>Test</td>
        </tr>
        <tr className='trr'>
            <td className='tdd'>5</td>
            <td className='tdd'>Fasil Web Portal</td>
            <td className='tdd'>Fasil FC</td>
            <td className='tdd'>  <div className="tableteam">
        <img src="./img/propic/habte.png" alt="" className="dashproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="dashproimg3" />
        <img src="./img/propic/kira.png" alt="" className="dashproimg4" />
        <div className="continuespann">
          <span className="spannumber">2+</span>
        </div>
        
        </div>
        </td>
            <td className='tdd'>19/7/2023</td>
            <td className='tdd'>2/8/2023</td>
            <td className='tdd'>Test</td>
        </tr>
        <tr className='trr'>
            <td className='tdd'>6</td>
            <td className='tdd'>Fasil Web Portal</td>
            <td className='tdd'>Fasil FC</td>
            <td className='tdd'>  <div className="tableteam">
        <img src="./img/propic/habte.png" alt="" className="dashproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="dashproimg3" />
        <img src="./img/propic/kira.png" alt="" className="dashproimg4" />
        <div className="continuespann">
          <span className="spannumber">2+</span>
        </div>
        
        </div>
        </td>
            <td className='tdd'>19/7/2023</td>
            <td className='tdd'>2/8/2023</td>
            <td className='tdd'>Test</td>
        </tr>
        <tr className='trr'>
            <td className='tdd'>7</td>
            <td className='tdd'>Fasil Web Portal</td>
            <td className='tdd'>Fasil FC</td>
            <td className='tdd'>  <div className="tableteam">
        <img src="./img/propic/habte.png" alt="" className="dashproimg2" />
        <img src="./img/propic/hermy.png" alt="" className="dashproimg3" />
        <img src="./img/propic/kira.png" alt="" className="dashproimg4" />
        <div className="continuespann">
          <span className="spannumber">2+</span>
        </div>
        
        </div>
        </td>
            <td className='tdd'>19/7/2023</td>
            <td className='tdd'>2/8/2023</td>
            <td className='tdd'>Test</td>
        </tr>
   
    </table>
            </div>
        </div>
    </div>
    <div className="dashbordrigtcon">
        <div className="dashtitle">Compliantes</div>
        <div className="progressbarout">
            <div className="progressbarmiddel">
                <div className="progressbarin"></div>
            </div>
        </div>
        <div className="notediv">
            <div className="inprobox"></div>
            <div className="inprotext">Compliant In progress</div>
        </div>
        <div className="notediv2">
            <div className="peprobox"></div>
            <div className="inprotext">Pending Compliant </div>
        </div>
        <div className="notediv3">
            <div className="reprobox"></div>
            <div className="inprotext">Resolved Compliant </div>
        </div>
        <div className="notediv4">
            <div className="allprobox"></div>
            <div className="inprotext">All Compliant</div>
        </div>
    </div>
   </div>

  
    
    </>
  )
}

export default Dashboard