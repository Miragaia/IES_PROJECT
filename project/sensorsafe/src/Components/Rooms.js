import React, { useState, useEffect } from 'react';
import "../Css/Rooms.css"; // Importe o arquivo CSS
import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'
import DeviceCard from './Card';
import { Modal, Box, Typography, IconButton, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toastify from './Toastify';
import CloseIcon from '@mui/icons-material/Close';

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

      const acess_data = await response.json();
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setAvailableDevices(acess_data);
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

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const [selectedDevices, setSelectedDevices] = useState([]);

const handleDeviceToggle = (device) => {
    // Verifica se o dispositivo já existe no array de dispositivos selecionados

    const deviceIndex = selectedDevices.findIndex((item) => item.deviceId === device.deviceId);

    // Se o dispositivo não existir no array, adiciona ele
    if (deviceIndex === -1) {
      setSelectedDevices([...selectedDevices, device]);
    } else {
      // Se o dispositivo existir no array, remove ele
      const filteredDevices = selectedDevices.filter((item) => item.deviceId !== device.deviceId);
      setSelectedDevices(filteredDevices);
    }


};

const handleAddDevices = () => {
//caso não tenha nenhum dispositivo selecionado
  if (selectedDevices.length === 0){ 
    Toastify.warning('Please select at least one device');
    return;
  }
  // separa em dois arrays consoante a categoria se for OTHERS é um dispostivo, senao sensor

  const device_others = selectedDevices.filter((device) => device.category === 'OTHERS');
  const device_sensors = selectedDevices.filter((device) => device.category !== 'OTHERS');

  // se tiver dispositivos OTHERS
  if (device_others.length > 0) {}

  // se tiver dispositivos sensors
  if (device_sensors.length > 0) {}

  handleCloseModal();

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
 <Box sx={{ borderRadius:'5px', width: 500, p: 1, backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>        

         <CloseIcon    onClick={handleCloseModal}
         sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 1,
            cursor: 'pointer',
            
          }}/>
        <Typography id="modal-modal-title" variant="h6" component="h5">
          Select devices to add to selected room:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            {availableDevicees.map((device) => (
              <div style={{margin:'2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Switch {...label} color="warning" onChange={() => handleDeviceToggle(device)}/>
                <Typography>{device.name}</Typography>
                </div>
                <Typography>{device.category}</Typography>
              </div>
            ))}
          </div>
          
          </Typography>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '5px' }}>
          <button style={{ margin: '10px',borderRadius:'5px', backgroundColor:"green" }} onClick={handleAddDevices}>Add Devices</button>
          <button style={{ margin: '10px', borderRadius:'5px'}} onClick={handleCloseModal}>Cancel</button>
        </div>

      </Box>
    </Modal>
      </div>

    </div>
    
  );
};

export default Rooms;
