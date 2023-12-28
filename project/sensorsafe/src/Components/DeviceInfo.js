// DeviceInfo.jsx

import React, { useState, useEffect } from 'react';
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";

const DeviceInfo = (roomId) => {
  console.log('RoomId:', roomId);
  // Placeholder for the number of devices (to be fetched dynamically in the future)
  const [numberOfDevices, setNumberOfDevices] = useState(0);
  useEffect(() => {
    const fetchRoomDevices = async (roomId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/room-devices/${roomId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Room devices N:', data);
        setNumberOfDevices(data); // Isso retornará o número de dispositivos associados ao roomId
      } catch (error) {
        console.error('Error fetching room devices:', error);
        throw new Error('Error fetching room devices');
      }
    }
    fetchRoomDevices();
  }, []);

  return (
    <div className="device-info-container">
      <h3 className="device-title">Device Information</h3>
      <div className="device-info-content">
        {/* Number of devices */}
        <p className='num_devices'> <CameraOutlinedIcon /> {numberOfDevices} Devices</p>
      </div>
    </div>
  );
};  

export default DeviceInfo;

