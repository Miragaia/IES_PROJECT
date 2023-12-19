import React, { useState, useEffect } from 'react';
import '../Css/Dashboard.css'; // Import the CSS file
import DeviceInfo from './DeviceInfo';
import ReportsSection from './ReportsSection';
import NotificationsSection from './NotificationsSection';
import GraphicSection from './GraphicSection';
import SensorsSelector from './SensorsSelector';
import { Link } from 'react-router-dom';
import Toastify from './Toastify';
import '../Css/RoomSelector.css'; // Import the CSS file
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
const Dashboard = () => {
  const [showReports, setShowReports] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [showGraphicSection, setShowGraphicSection] = useState(true);
  const [selectedItem, setSelectedItem] = useState('rooms');
  const [numberOfDevices, setNumberOfDevices] = useState(0);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    fetchRoomDevices(room);
    console.log('Room selected:', room);
    
    // Add additional logic or actions based on the selected room
    
  };

  const toggleReports = () => {
    setShowReports(!showReports);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleGraphicSection = () => {
    setShowGraphicSection(!showGraphicSection);
  };

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  }

  useEffect(() => {
    // Fetch rooms data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rooms/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });
  
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        setRooms(data);
        
  
        if (data.length > 0) {
          setSelectedRoom(data[0].roomId);
          fetchRoomDevices(data[0].roomId);
        }
      } catch (error) {
        Toastify.warning('Error fetching rooms:', error)
        console.error('Error fetching rooms:', error);
      }
    };
  
    fetchData();
  }, []);

    const fetchRoomDevices = async (room) => {
      console.log('RoomId:', room);
      try {
        const response = await fetch(`http://localhost:8080/api/room-devices/${room}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });
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

  return (
    <div className="dashboard-container">
      <h2 className='dash-title'>Dashboard</h2>
      <div className="Reports"> 
        <nav id="nav10">
          <ul className="nav-links-Reports">
            <li id="RoomsRep" className={selectedItem === 'rooms' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('rooms')}>Rooms</Link>
            </li>
            <li id="DevicesRep" className={selectedItem === 'devices' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('devices')}>Sensors</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="contentRep"></div>
      {selectedItem === 'rooms' ? (
            <>
              {/* Room Selector */}
              <div className="room-selector-container">
                <h3 className='select-title'>Select Room</h3>
                <div className="room-options">
                {rooms.map((room) => (
                  <span
                    className={`room-option ${selectedRoom === room.roomId ? 'active' : ''}`}
                    onClick={() => handleRoomSelection(room.roomId)}
                  >
                    {room.roomName}
                  </span>
                ))}
                </div>
              </div>

              <div className="device-info-container">
                <h3 className="device-title">Device Information</h3>
                <div className="device-info-content">
                  {/* Number of devices */}
                  <p className='num_devices'> <CameraOutlinedIcon /> {numberOfDevices} Devices</p>
                </div>
              </div>

              {/* Toggle Sections */}
              <div className="toggle-buttons">
                <button id="hideRep" onClick={toggleReports} data-action={showReports ? 'Hide' : 'Show'}>
                  {showReports ? 'Hide Reports' : 'Show Reports'}
                </button>
                <button id="hideNot" onClick={toggleNotifications} data-action={showNotifications ? 'Hide' : 'Show'}>
                  {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
                </button>
                <button id="hideGrafSec" onClick={toggleGraphicSection} data-action={showGraphicSection ? 'Hide' : 'Show'}>
                  {showGraphicSection ? 'Hide Graphic Section' : 'Show Graphic Section'}
                </button>
              </div>


              {/* Sections Side by Side */}
              <div className="sections-container">
                {/* Reports Section */}
                {showReports && <ReportsSection />}

                {/* Notifications Section */}
                {showNotifications && <NotificationsSection />}

                {/* Graphic Section */}
                {showGraphicSection && <GraphicSection />}

              </div>
            </>
          ) : (
            <>
            {/* Room Selector */}
            <SensorsSelector />

            {/* Toggle Sections */}
            <div className="toggle-buttons">
              <button id="hideRep" onClick={toggleReports} data-action={showReports ? 'Hide' : 'Show'}>
                {showReports ? 'Hide Reports' : 'Show Reports'}
              </button>
              <button id="hideNot" onClick={toggleNotifications} data-action={showNotifications ? 'Hide' : 'Show'}>
                {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
              </button>
              <button id="hideGrafSec" onClick={toggleGraphicSection} data-action={showGraphicSection ? 'Hide' : 'Show'}>
                {showGraphicSection ? 'Hide Graphic Section' : 'Show Graphic Section'}
              </button>
            </div>


            {/* Sections Side by Side */}
            <div className="sections-container">
              {/* Reports Section */}
              {showReports && <ReportsSection />}

              {/* Notifications Section */}
              {showNotifications && <NotificationsSection />}

              {/* Graphic Section */}
              {showGraphicSection && <GraphicSection />}

            </div>
            </>
          )}
    </div>
      
  );
};

export default Dashboard;
