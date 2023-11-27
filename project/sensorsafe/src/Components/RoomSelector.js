// RoomSelector.jsx

import React from 'react';
import { useState } from 'react';
import '../Css/RoomSelector.css'; // Import the CSS file

const RoomSelector = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    // Add additional logic or actions based on the selected room
    console.log(`Selected room: ${room}`);
  };

  return (
    <div className="room-selector-container">
      <h3 className='select-title'>Select Room</h3>
      <div className="room-options">
        <span
          className={`room-option ${selectedRoom === 'Kitchen' ? 'active' : ''}`}
          onClick={() => handleRoomSelection('Kitchen')}
        >
          Kitchen
        </span>
        <span
          className={`room-option ${selectedRoom === 'Bathroom' ? 'active' : ''}`}
          onClick={() => handleRoomSelection('Bathroom')}
        >
          Bathroom
        </span>
        <span
          className={`room-option ${selectedRoom === 'Living Room' ? 'active' : ''}`}
          onClick={() => handleRoomSelection('Living Room')}
        >
          Living Room
        </span>
        <span
          className={`room-option ${selectedRoom === 'Bedroom' ? 'active' : ''}`}
          onClick={() => handleRoomSelection('Bedroom')}
        >
          Bedroom
        </span>
        {/* Add more room options as needed */}
      </div>
    </div>
  );
};

export default RoomSelector;

