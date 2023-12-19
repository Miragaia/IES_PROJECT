// RoomSelector.jsx

import React, { useState, useEffect } from 'react';
import '../Css/RoomSelector.css'; // Import the CSS file
import Toastify from './Toastify';

const SensorsSelector = () => {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [sensors, setSensor] = useState([]);

  const handleSensorSelection = (sensor) => {
    setSelectedSensor(sensor);
    
  };

  useEffect(() => {

    const fetchData2 = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/devices/sensors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });
  
        const data_f2 = await response.json();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("Sensors: ", data_f2);
        
        setSensor(data_f2); // Add new elements to the existing list
        if (data_f2.length > 0) {
          setSelectedSensor(data_f2[0].deviceId);
        }

      } catch (error) {
        Toastify.warning('Error fetching devices:', error);
        console.error('Error fetching devices:', error);
      }
    }
    fetchData2();
  
  }, []);

  return (
    <div className="sensors-selector-container">
      <h3 className='select-title'>Select Device</h3>
      <div className="sensors-options">
      {sensors.map((sensor) => (
        <span
          className={`sensors-option ${selectedSensor === sensor.deviceId ? 'active' : ''}`}
          onClick={() => handleSensorSelection(sensor.deviceId)}
        >
          {sensor.name}
        </span>
      ))}
      </div>
    </div>
  );
};

export default SensorsSelector;

