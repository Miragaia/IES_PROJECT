import React, { useState, useEffect } from 'react';
import "../Css/Rooms.css"; // Importe o arquivo CSS
import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'
import DeviceCard from './Card';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toastify from './Toastify';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [availableDevicees, setAvailableDevices] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState('devices');
  const navigate = useNavigate();

  const [AddDevice, setOpenAddDevice] = useState(false);

  const handleOpenModal = () => {
    setOpenAddDevice(true);
  }

  const handleCloseModal = () => {
    setOpenAddDevice(false);
  }

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
};

const handleSearch = async () => {

};

const handleAddItem = (itemName) => {

}

useEffect (() =>{
    const acessibleData = async ()=> {
      try{
      const response = await fetch('http://localhost:8080/api/devices/available', {
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

      setAvailableDevices(data);
    } catch (error) {
      Toastify.warning('Error fetching rooms:', error)
      console.error('Error fetching rooms:', error);
    }
  };
    acessibleData();
  }, []);


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
    } catch (error) {
      Toastify.warning('Error fetching rooms:', error)
      console.error('Error fetching rooms:', error);
    }
  };

  fetchData();
}, []);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  return (
    <div className="Rooms"> 
     <nav id="nav1">
        <ul className="nav-links-Rooms">
          {rooms.map((room) => (
            <li key={room.roomid} className={selectedItem === room.name ? 'active' : ''}>
              <Link onClick={() => handleItemClick(room.name)}>{room.roomName}</Link>
            </li>
          ))}
          <li id="addroom" className={selectedItem === 'addRoom' ? 'active' : ''}>
            <Link to='/create_room'>Add Room +</Link>
          </li>
        </ul>
      </nav>
      <div className="search-bar">
            <div className='room-details-button'>
                <Link to="/roomdetails" onClick={() => handleItemClick('roomdetails')}>
                    <button className='btn-room-details'>
                      Room Details
                    </button>
                </Link>
            </div>
            <div className="search-bar-content">
                <input
                    type="text"
                    placeholder="&#128269;  Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
      </div>

      {/* Renderização condicional do conteúdo */}
      <div className="content">
        {selectedItem === 'devices' ? (
          <>
            <div className="room-devices-cards-container">
              {/*{Array.isArray(devices) ? (
                devices.map((item, index) => (
                    <DeviceCard key={index} item={item} />
                ))
              ) : (
                <div>No products available.</div>
              )}*/}
              <DeviceCard />
              <button className="btn edit-button add-product" onClick={handleOpenModal}>
                <i className="animation"></i>Add Device +<i className="animation"></i>
              </button>

            </div>
            
          </>
         ) : (null) 
         //selectedItem === 'rooms' ? (
        //   <>
        //     {/* Conteúdo para a opção 'rooms' */}
        //   </>
        // ) : selectedItem === 'reports' ? (
        //   <>
        //     {/* Conteúdo para a opção 'reports' */}
        //   </>
        // ) : (
        //   <>
        //     {/* Conteúdo padrão caso nenhuma opção selecionada */}
        //   </>
      };
      
      <Modal
      open={AddDevice}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
         x
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h5">
          Select Device to add to selected room
        </Typography>
        

      </Box>
    </Modal>
      </div>

    </div>
    
  );
};

export default Rooms;
