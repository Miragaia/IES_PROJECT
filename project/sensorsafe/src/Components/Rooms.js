import React, { useState, useEffect } from 'react';
import "../Css/Rooms.css"; // Importe o arquivo CSS
import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'
import DeviceCard from './CardDevices';
import { Modal, Box, Typography, IconButton, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toastify from './Toastify';
import CloseIcon from '@mui/icons-material/Close';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [roomDevices, setRoomDevices] = useState([]);
  const [availableDevicees, setAvailableDevices] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const navigate = useNavigate();

  const [AddDevice, setOpenAddDevice] = useState(false);
  const [DeleteRoom, setOpenDeleteRoom] = useState(false);

  const handleOpenModal = () => {
    setOpenAddDevice(true);
  }

  const handleCloseModal = () => {
    setOpenAddDevice(false);
  }

  const handleOpenModalRoom = () => {
    setOpenDeleteRoom(true);
  }

  const handleCloseModalRoom = () => {
    setOpenDeleteRoom(false);
  }

  const handleItemClick = (roomId) => {
    setSelectedItem(roomId);
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

    // if (data.length > 0) {
    //   setSelectedItem(data[0].roomId);
    // }
  } catch (error) {
    Toastify.warning('Error fetching rooms:', error)
    console.error('Error fetching rooms:', error);
  }
};


const handleDeleteRoom = async (roomId) => {

  
  
    try{
      const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
        },
        
    });

    const acess_data = await response.json();

    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (acess_data.message === 'Room deleted successfully'){
      Toastify.success('Room deleted successfully');
      window.location.reload();
      setOpenDeleteRoom(false);
      

      
    }

  } catch (error) {
    Toastify.warning('Error fetching rooms:', error)
    console.error('Error fetching rooms:', error);
  }
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
    fetchData();
  }, []);


  useEffect(() => {
    if (selectedItem !== '') {
      const fetchDevices = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/devices/sensors/${selectedItem}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
            },
          });

          const data = await response.json();

          setSensors(data);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          Toastify.warning('Error fetching devices:', error)
          console.error('Error fetching devices:', error);
        }
      };
      console.log('Sensor', sensors);

      fetchDevices();

      const fetchDevices2 = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/devices/${selectedItem}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
            },
          });

          const data = await response.json();

          setDevices(data);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
        } catch (error) {
          Toastify.warning('Error fetching devices:', error)
          console.error('Error fetching devices:', error);
        }
      }

      fetchDevices2();

      console.log('Devices', devices);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItem !== '') {
      const combinedData = [...devices, ...sensors];

      setRoomDevices(devices);
    }
  }, [devices, sensors]);
  console.log('acessible devices ',availableDevicees);
  console.log('room vevices ',roomDevices);
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
  console.log('selected devices', selectedDevices);
  if (selectedDevices.length === 0){ 
    Toastify.warning('Please select at least one device');
    return;
  }
  // separa em dois arrays consoante a categoria se for OTHERS é um dispostivo, senao sensor

  const device_others = selectedDevices.filter((device) => device.category === 'OTHERS');
  const device_sensors = selectedDevices.filter((device) => device.category !== 'OTHERS');

  // se tiver dispositivos OTHERS
  if (device_others.length > 0) {
    // o device others vai ser um array de objetos com o deviceId, e quero fazer fetch a cada um deles
    device_others.forEach(async (device) => {
      try {
        const response = await fetch(`http://localhost:8080/api/devices/add-accessible-to-room/${selectedItem}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
          body: JSON.stringify({
            deviceId: device.deviceId,
            name: device.name,
            category: device.category,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        if (data.message === 'Device successfully added to room'){
          Toastify.success('Device added successfully');
          window.location.reload();
          handleCloseModal();
          
        }
        else{
          Toastify.error('Error adding device:', data.message)
        }
      } catch (error) {
        Toastify.warning('Error adding device:', error)
        console.error('Error adding device:', error);
      }
    });

  }

  // se tiver dispositivos sensors
  if (device_sensors.length > 0) {
    // o device sensors vai ser um array de objetos com o deviceId, e quero fazer fetch a cada um deles
    device_sensors.forEach(async (device) => {
      try {
        const response = await fetch(`http://localhost:8080/api/devices/sensors/add-accessible-to-room/${selectedItem}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
          body: JSON.stringify({
            deviceId: device.deviceId,
            name: device.name,
            category: device.category,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        if (data.message === 'Sensor successfully added to room'){
          Toastify.success('Sensor successfully added to room');
          handleCloseModal();
        }
        else{
          Toastify.error('Error adding sensor:', data.message)
        }
      } catch (error) {
        Toastify.warning('Error adding device:', error)
        console.error('Error adding device:', error);
      }
    });
  }

  handleCloseModal();

};
  return (
    <div className="Rooms"> 
     <nav id="nav1">
        <ul className="nav-links-Rooms">
          {rooms.map((room) => (
            <li key={room.roomId} className={selectedItem === room.roomId ? 'active' : ''}>
              <Link onClick={() => handleItemClick(room.roomId)}>{room.roomName}</Link>
            </li>
          ))}
          <li id="addroom" className={selectedItem === 'addRoom' ? 'active' : ''}>
            <Link to='/create_room'>Add Room +</Link>
          </li>
        </ul>
      </nav>
      {selectedItem === '' ? (
          null) :(
      <div className="search-bar">
        <div className='room-buttons'>  
            <div className='room-details-button'>
                <Link to={`/roomdetails/${selectedItem}`} onClick={() => handleItemClick('roomdetails')}>
                    <button className='btn-room-details'>
                      Room Details
                    </button>
                </Link>
            </div>
            <div className='deleteRoom-button'>
              <button className='btn-other deleteRoom-button' onClick={() => handleOpenModalRoom()}>
                Delete Room
              </button>
              <Modal
                open={DeleteRoom}
                aria-labelledby="modal-modal-title-delRooms"
                aria-describedby="modal-modal-description-delRooms"
              >
                <Box sx={style}>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseModalRoom}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  >
                  x
                  </IconButton>
                  <Typography id="modal-modal-title-delRooms" variant="h6" component="h5">
                    Are you sure you want to delete this room?
                  </Typography>
                  <div className="modal-buttons-delRooms">
                    <button id="delRoomYes" className="btn-confirmation-delRooms" onClick={() => handleDeleteRoom(selectedItem)}>
                      Yes
                    </button>
                    <button id ="delRoomNo" className="btn-confirmation-delRooms" onClick={handleCloseModalRoom}>
                      No
                    </button>
                  </div>
                  

                </Box>
              </Modal>
            </div>
        </div>

 
      </div>
     )}
      {/* Renderização condicional do conteúdo */}
      <div className="content">



        {selectedItem === '' ? (
          
          //cria me uma div centrada no meio da pagina que vai listar txto no centro da pagina
          <div className="empty-room">
            <h1 style={{fontWeight:"bold"}}>Select a room to view details</h1>
          </div>
        ) :(
          <>
            <div className="room-devicesandsensors-cards-container">
              {roomDevices.length > 0 ? (
                  // quero agora que compares o roomDevicces.id com o selecteditem e caso os idss sejam iguais renderizas o card senao da a mensagem de erro
                roomDevices.some((roomDevice) => roomDevice.roomID === selectedItem) ? (
                  roomDevices
                    .filter((roomDevice) => roomDevice.roomID === selectedItem)
                    .map((roomDevice) => (
         
                      <DeviceCard key={roomDevice.deviceId} item={roomDevice} />
                    ))         
                  ) : (
                    <div style={{justifyContent: 'center', alignItems: 'center', width: '100%', marginLeft: '20px'}}>
                        <div style={{ textAlign: 'center', fontWeight: 'bold' }}> No devices to display.</div>
                        <div style={{ textAlign: 'center', fontWeight: 'bold' }}> Click on the button below to add a new acessible device.</div>
                      </div>
                  )
              ) : (
                <div style={{justifyContent: 'center', alignItems: 'center', width: '100%', marginLeft: '20px'}}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}> No devices to display.</div>
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}> Click on the button below to add a new acessible device.</div>
                  </div>
              )}
              <button className="btn edit-button add-product" onClick={handleOpenModal}>
                <i className="animation"></i>Add Device +<i className="animation"></i>
              </button>

            </div>
            
          </>
         )
 
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
          <button className="btn-confirmation-delRooms" id="AddDeviceRoom" style={{ margin: '10px',borderRadius:'5px', backgroundColor:"green !important" }} onClick={handleAddDevices}>Add Devices</button>
          <button className="btn-confirmation-delRooms" id="delRoomYes" style={{ margin: '10px', borderRadius:'5px'}} onClick={handleCloseModal}>Cancel</button>
        </div>

      </Box>
    </Modal>
      </div>

    </div>
    
  );
};

export default Rooms;
