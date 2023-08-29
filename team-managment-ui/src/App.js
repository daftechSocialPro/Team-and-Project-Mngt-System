import './App.css';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './component/Loading/Loading';
import Dashboard from './Pages/Dashboard';
import EmpDetail from './Pages/EmpDetail';
import Employee from './Pages/Employee';
import Login from './auth/Login';
import Project from './Pages/Project';
import Team from './Pages/Team';
import Users from './Pages/Users';
import Profile from './Pages/Profile';

function App() {
  const user = useSelector((state) => state.user);

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          {user ? (
            <Route path="/">
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project" element={<Project />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/team" element={<Team />} />
              <Route path="/empdetail" element={<EmpDetail />} />
              <Route path="/users" element={<Users />} />
              <Route path="/pro" element={<Profile />} />
            </Route>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;