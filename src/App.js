import './App.css';
import Dashboard from './Pages/Dashboard';
import EmpDetail from './Pages/EmpDetail';
import Employee from './Pages/Employee';
import Login from './Pages/Login';
import Project from './Pages/Project';
import Team from './Pages/Team';
import Saidbar from './component/Saidbar';
import Users from './Pages/Users'
import { BrowserRouter as Router ,  Routes, Route} from 'react-router-dom';
import Profile from './Pages/Profile';
function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path='/'  element={< Login/>} />
    </Routes>
    <Saidbar/>
    <Routes>
      <Route path='/dashbord'  element={< Dashboard/>} />
      <Route path='/project'  element={< Project/>}/>
      <Route path='/employee' element={< Employee/>}/>
      <Route path='/team'  element={<Team/>}/>
      <Route path='/empdetail'  element={<EmpDetail/>}/>
      <Route path='/users'  element={<Users/>}/>
      <Route path='/pro'  element={<Profile/>}/>
    </Routes>
    </Router>
  
  
    </>
  );
}

export default App;
