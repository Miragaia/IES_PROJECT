import './App.css';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import Home from './Components/Home';
import Devices from './Components/Devices';
import Rooms from './Components/Rooms';
import Profile from './Components/Profile';
import SignIn from './Components/SignIn';
import CreateDevice from './Components/CreateDevice';
import CreateRoom from './Components/CreateRoom';
import SignUp from './Components/SignUp';
import DetailDevice from './Components/DetailDevice';
import RoomDetails from './Components/RoomDetails';
import Dashboard from './Components/Dashboard';
import EditProfile from './Components/EditProfile';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <ToastContainer />
        <Navbar />
          <Routes>
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/" element={<Home />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create_device" element={<CreateDevice/>}/>
            <Route path="/create_room" element={<CreateRoom/>}/>
            <Route path="/detail_device" element={<DetailDevice/>}/> 
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/roomdetails/:roomId" element={<RoomDetails />} />
            <Route path="/reports" element={<Dashboard />} />
          </Routes>
        <Navbar />
    </Router>
  );
}

export default App;
