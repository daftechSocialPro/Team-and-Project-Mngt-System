import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../component/EmployeeCard/login.css";
import { login } from "../api/authApi";

import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setLoading } from '../store/loadingReducer';

const Login = ({show}) => {

  const dispatch = useDispatch()



  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));


    try {
      const userData = await login(username, password);

      if (userData.success) {

        show("success", "SUCCESS", userData.message);
        
          sessionStorage.setItem('token', userData.data);
          const decoded = jwtDecode(userData.data);
          dispatch({ type: 'LOGIN_SUCCESS', payload: decoded });
          dispatch(setLoading(false));
          navigate("/dashboard");
       

      } else {
        show("error", "ERROR", userData.message);
        dispatch(setLoading(false));
      }
    } catch (error) {

      show('error', 'ERROR', error)
      dispatch(setLoading(false));
    }
  };

  const BUTTON = {
    cursor: "pointer",
  };
  return (
    <>
     
      <div className="login-container">
        <div
          className="right-login"
          style={{
            backgroundImage: `url("./img/back1.jpg")`,
          }}
        >
          <h2 className="h2logo">Dafetech Social ICT Solutions</h2>
          <div className="center">
            <p className="ptitle">Nice to see you again</p>
            <h2 className="h2wellcome">Welcome Back</h2>
          </div>
        </div>
        <div className="left-login">
          <div className="imclas">
            <img
              className="loginimage"
              src="./img/newlogo.png"
              alt=""
              srcSet=""
            />
          </div>
          <div className="login-form">
            <form action="" onSubmit={handleLogin}>
              <h1 className="h1tite">Login to your Account</h1>
              <p className="ptite">Enter your user name & password to login</p>
              <div className="in">
                <div className="verline2"></div>
                <div className="input-box">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="in">
                <div className="verline1"></div>
                <div className="input-box">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
              </div>

              <button className="btn" style={BUTTON} type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
