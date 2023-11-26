import './App.css';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import Home from './Components/Home';
import Devices from './Components/Devices';
import Rooms from './Components/Rooms';
import Reports from './Components/Reports';
import Profile from './Components/Profile';
import SignIn from './Components/SignIn';
import AddDevice from './Components/AddDevice';
import SignUp from './Components/SignUp';
import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
          <Routes>
            <Route path="/" element={<AboutUs />} />
            <Route path="/home" element={<Home />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/add_device" element={<AddDevice/>}/>
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
        <Navbar />
      </AuthProvider>
    </Router>
  );
}

export default App;
