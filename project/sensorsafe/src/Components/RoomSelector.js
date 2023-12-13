// RoomSelector.jsx

import React, { useState, useEffect } from 'react';
import '../Css/RoomSelector.css'; // Import the CSS file
import Toastify from './Toastify';

const RoomSelector = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    // Add additional logic or actions based on the selected room
    console.log(`Selected room: ${room}`);
  };

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
        }
      } catch (error) {
        Toastify.warning('Error fetching rooms:', error)
        console.error('Error fetching rooms:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
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
  );
};

export default RoomSelector;

