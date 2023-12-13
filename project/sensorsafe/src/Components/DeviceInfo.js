// DeviceInfo.jsx

import React from 'react';
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";

const DeviceInfo = () => {
  // Placeholder for the number of devices (to be fetched dynamically in the future)
  const numberOfDevices = 5;

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

