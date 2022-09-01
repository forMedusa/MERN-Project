import './App.css';
import Signup from './Pages/signup/Signup';
import Login from './Pages/login/Login';
import Profile from './Pages/Profile/Profile';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Profile" element={<Profile/>}/>
        </Routes>
      </Router>
      </div>
   
  );
}

export default App;
