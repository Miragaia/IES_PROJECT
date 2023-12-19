// RoomSelector.jsx

import React, { useState, useEffect } from 'react';
import '../Css/RoomSelector.css'; // Import the CSS file


const RoomSelector = () => {
  

  

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

