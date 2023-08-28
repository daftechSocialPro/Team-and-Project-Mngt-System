import React from 'react'
import { Link } from 'react-router-dom'
import '../component/EmployeeCard/login.css'
const Login = () => {
  return (
    <>
    <div className="login-container">
        <div className="right-login" style={{ 
      backgroundImage: `url("./img/back1.jpg")` 
    }}>
            <h2 className="h2logo">Dafetech Social ICT Solutions</h2>
            <div className="center">
                <p className="ptitle">Nice to see you again</p>
                <h2 className="h2wellcome">Welcome Back</h2>
            </div>
    
        </div>
        <div className="left-login">
            <div className="imclas">
                <img className="loginimage" src="./img/newlogo.png" alt="" srcset=""/>
            </div>
            <div className="login-form">
                <form action="">
                    <h1 className="h1tite">Login to your Account</h1>
                    <p className="ptite">Enter your user name & password to login</p>
                    <div className="in">
                        <div className="verline2"></div>
                        <div className="input-box">
                            <input type="text" placeholder="Username" required/>
                        </div>
                    </div>
                    <div className="in">
                        <div className="verline1"></div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required/>
                        </div>
                    </div>
                
                   
                   <Link to="/dashbord"><button className="btn" type="submit">Login</button> </Link> 
                 </form>
             </div>
        </div>
    </div>
    </>
  )
}

export default Login