import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'
import "../Css/Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedItem, setSelectedItem] = useState('');
  const navigate = useNavigate(); // Utilize useNavigate para realizar a navegação
  const location = useLocation();

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedItem('');
    navigate("/home");
  };

  useEffect(() => {
    const pathname = location.pathname;
    const selectedItemFromPath = pathname.split('/').filter(Boolean)[0]; // Pega a primeira parte do pathname (excluindo barras extras)

    setSelectedItem(selectedItemFromPath);
  }, [location.pathname]);

  return (
    <div className="Navbar"> 
      <nav className="Navbar1">
              
          {isLoggedIn ? (
            <>
              <div className="logo">
                <a href="/devices">
                  <span>SensorSafe</span>
                </a>
              </div>
              <ul className="nav-links">
                <li className={selectedItem === 'devices' ? 'active' : ''}>
                  <Link to="/devices" onClick={() => handleItemClick('devices')}>Devices</Link>
                </li>
                <li className={selectedItem === 'rooms' ? 'active' : ''}>
                  <Link to="/rooms" onClick={() => handleItemClick('rooms')}>Rooms</Link>
                </li>
                <li className={selectedItem === 'reports' ? 'active' : ''}>
                  <Link to="/reports" onClick={() => handleItemClick('reports')}>Reports</Link>
                </li>
                <li className={selectedItem === 'about' ? 'active' : ''}>
                  <Link to="/" onClick={() => handleItemClick('about')}>About Us</Link>
                </li>
                <li className={selectedItem === 'profile' ? 'active' : ''}>
                  <Link to="/profile" className="login-button" onClick={() => handleItemClick('profile')}>Profile</Link>
                </li>
                <li><a className="login-button" onClick={handleLogout}>Logout</a></li>
              </ul>
            </>
          ) : (
            <>
              <div className="logo">
                <a href="/">
                  <span>SensorSafe</span>
                </a>
              </div>
              <ul className="nav-links">
                <li className={selectedItem === 'home' ? 'active' : ''}>
                  <Link to="/home" onClick={() => handleItemClick('home')}>Home</Link>
                </li>
                <li className={selectedItem === 'about' ? 'active' : ''}>
                  <Link to="/" onClick={() => handleItemClick('about')}>About Us</Link>
                </li>
                <li><Link to="/signIn" className="login-button2">Login</Link></li>
                <li><Link to="/register" className="login-button2" onClick={() => handleItemClick('register')}>Register</Link></li>
              </ul>
            </>
          )}
        
      </nav>
    </div>
  );
};

export default Navbar;
