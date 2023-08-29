import React,
{useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import '../component/EmployeeCard/login.css'
import {login} from '../api/authApi'
import { Toast } from 'primereact/toast';
import { useDispatch } from 'react-redux';    
import { useSelector } from 'react-redux';


const Login = () => {
    const dispatch = useDispatch();
    const toast = useRef(null);

    const show = (severity,summary,message) => {
        toast.current.show({ severity: severity, summary: summary, detail: message });
    };


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const userData = await login(username, password); 

          if (userData.success){

            show('success','SUCCESS',userData.message)
            dispatch({ type: 'LOGIN_SUCCESS', payload: userData.data });
          }else{
            show('error','ERROR',userData.message)
          }

         
        } catch (error) {
          // Handle login error
        }
      };
    
  return (
    <>
    <Toast ref={toast} />
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
                <img className="loginimage" src="./img/newlogo.png" alt="" srcSet=""/>
            </div>
            <div className="login-form">
                <form action="" onSubmit={handleLogin} >
                    <h1 className="h1tite">Login to your Account</h1>
                    <p className="ptite">Enter your user name & password to login</p>
                    <div className="in">
                        <div className="verline2"></div>
                        <div className="input-box">
                            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="Username" />
                        </div>
                    </div>
                    <div className="in">
                        <div className="verline1"></div>
                        <div className="input-box">
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Password" />
                        </div>
                    </div>
                
                   
                  <button className="btn" type="submit">Login</button> 
                 </form>
             </div>
        </div>
    </div>
    </>
  )
}

export default Login

