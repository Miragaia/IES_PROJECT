import React from 'react';
import '../Css/Home.css'
import foto from '../businessman.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="centered-content">
        <h1>SensorSafe</h1>
        <p>
            SensorSafe is a system with the objective of managing all the sensors in a building. This system was designed 
            to help different type of users, 
          from house owners to the Building Manager, having control of the temperatures/humidity of his own divisions/apartments or even for a security context by having control of a smoke sensor to 
          prevent a fire. This system offers a full control of every type of sensors, allows users to have an app to them all prevent the need of the users to own multiple apps to control each one.
        </p>
        <div className="buttons">
          <button id="loginHome" onClick={() => (navigate('/signin'))}>Login</button>
          <button id="registerHome" onClick={() => (navigate('/signup'))}>Register</button>
        </div>
        <img src={foto} className='handsfoto' alt="foto" />
      </div>
    </div>
  );
};

export default Home;

