import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/login';
import Register from "./Components/register/register"
import Createvent from './Components/Events/CreateEvent';
import Showevents from "./Components/Events/Showevents"
function App() {
  let loginstatus = localStorage.getItem("Userid")
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/event' element={(loginstatus) ? <Createvent /> : <Login />} />
          {(loginstatus) ? <Route path='/showevents' element={<Showevents />} /> : null}


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
