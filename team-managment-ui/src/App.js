import './App.css';
import React, { Suspense, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Loading from './component/Loading/Loading';
import Dashboard from './Pages/Dashboard';
import EmpDetail from './Pages/EmpDetail';
import Employee from './Pages/Employee';
import Login from './auth/Login';
import Project from './Pages/Project';
import Team from './Pages/Team';
import Users from './Pages/Users';
import Profile from './Pages/Profile';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const loading = useSelector((state) => state.loading);
  const toast = useRef(null);

  const token = sessionStorage.getItem('token')

  const show = (severity, summary, message) => {
    toast.current&& toast.current.show({
       severity: severity,
       summary: summary,
       detail: message,
     });
   };

  const performLogin = () => {
    if (token) {
      const decoded = jwt_decode(token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: decoded });
    }
  };

  useEffect(() => {
    performLogin(); // Perform login logic when component mounts
  }, []); // Empty dependency array ensures the effect runs only on mount

  useEffect(() => {
    performLogin(); // Perform login logic when token changes
  }, [dispatch, token]);

  return (
    <Suspense >
       <Toast ref={toast} />
      {loading.loading &&

        <Loading />}
      
        <Router>
          <Routes>
            {user.user || token ? (
              <Route path="/">
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/project" element={<Project />} />
                <Route path="/employee" element={<Employee show={show} />} />
                <Route path="/team" element={<Team />} />
                <Route path="/empdetail" element={<EmpDetail />} />
                <Route path="/users" element={<Users />} />
                <Route path="/pro" element={<Profile />} />
              </Route>
            ) : (
              <Route path="*" element={<Login show={show} />} />
            )}
          </Routes>
        </Router>
    </Suspense>
  );
}

export default App;