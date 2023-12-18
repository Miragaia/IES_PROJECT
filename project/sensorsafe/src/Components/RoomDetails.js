import React, { useState } from 'react';
import "../Css/RoomDetails.css"; // Importe o arquivo CSS
import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'
import DeviceCard from './Card';
import { useEffect } from 'react';
import Toastify from './Toastify';
import { Modal, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


// RoomDetailsPage.jsx

const RoomDetailsPage = () => {

  const[room, setRoom] = useState([])
  const {roomId } = useParams();
  // State to track the activation status of each control
  const [temperatureControl, setTemperatureControl] = useState(false);
  const [humidityControl, setHumidityControl] = useState(false);
  const [smokeControl, setSmokeControl] = useState(false);

  // State for min and max values
  const [minTemperature, setMinTemperature] = useState(0);
  const [maxTemperature, setMaxTemperature] = useState(0);
  const [minHumidity, setMinHumidity] = useState(0);
  const [maxHumidity, setMaxHumidity] = useState(0);
  const [minSmoke, setMinSmoke] = useState(0);
  const [maxSmoke, setMaxSmoke] = useState(0);

  const [modal, setModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const [controlo, setControlo] = useState('');
  const [cont, setCont] = useState(false);

  const [auto,setAuto]=useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`, {
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
    
        setRoom(data);
    
        setTemperatureControl(data.automatized.automatizedTemperature);
        setHumidityControl(data.automatized.automatizedHumidity);
        setSmokeControl(data.automatized.automatizedSmoke);
        setMinTemperature(data.automatized.minTemperature);
        setMaxTemperature(data.automatized.maxTemperature);
        setMinHumidity(data.automatized.minHumidity);
        setMaxHumidity(data.automatized.maxHumidity);
        setMaxSmoke(data.automatized.maxSmoke);
        
      } catch (error) {
        Toastify.warning('Error fetching rooms:', error)
        console.error('Error fetching rooms:', error);
      }
    };
    fetchData();
  }, []);

  const handleCloseModal = () => {
    Toastify.warning('Room ' + controlo + ' automation not updated');
    setModal(false);
  };
  const handleCloseModalConfirm = () => {
    Toastify.warning('Room ' + auto + ' automation not updated');
    setModalConfirm(false);
  };
  const toggleControl = (control) => {
    // primeiro abre um modal para confirmar se quer mesmo ativar ou desativar
    // depois faz o fetch para a api
    // depois atualiza o state
    switch (control) {
      case 'temperature':
        setCont(!temperatureControl);
        setTemperatureControl(!temperatureControl);
        break;
      case 'humidity':
        setCont(!humidityControl);
        setHumidityControl(!humidityControl);
        break;
      case 'smoke':
        setCont(!smokeControl);
        setSmokeControl(!smokeControl);
        break;
      default:
        break;
    }
    setControlo(control);
    setModal(true);   
  };
  const handleConfirmModal = () => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/room-automatized/${roomId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
            },
            body: JSON.stringify({
              "automatizedTemperature": temperatureControl,
              "automatizedHumidity": humidityControl,
              "automatizedSmoke": smokeControl,
              "minTemperature": minTemperature,
              "maxTemperature": maxTemperature,
              "minHumidity": minHumidity,
              "maxHumidity": maxHumidity,
              "maxSmoke": maxSmoke
            })
          });
          
          console.log("temperatureControl", temperatureControl)
          console.log("humidityControl", humidityControl)
          console.log("smokeControl", smokeControl)
          console.log("minTemperature", minTemperature)
          console.log("maxTemperature", maxTemperature)
          console.log("minHumidity", minHumidity)
          console.log("maxHumidity", maxHumidity)
          console.log("maxSmoke", maxSmoke)
          console.log("roomId", roomId)
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

      
          if (response.ok) {
            Toastify.success(`Room ${controlo} automation updated successfully`);
          }

        } catch (error) {
          Toastify.warning('Error fetching rooms:', error)
          console.error('Error fetching rooms:', error);
        }

        setModal(false);
      }
      fetchData();
    
  };
  

  // Function to handle changes in min and max values
  const handleMinChange = (e, control) => {
    switch (control) {
      case 'temperature':
        setMinTemperature(Number(e.target.value));
        break;
      case 'humidity':
        setMinHumidity(Number(e.target.value));
        break;
      case 'smoke':
        setMinSmoke(Number(e.target.value));
        break;
      default:
        break;
    }
  };

  const handleMaxChange = (e, control) => {
    switch (control) {
      case 'temperature':
        setMaxTemperature(Number(e.target.value));
        break;
      case 'humidity':
        setMaxHumidity(Number(e.target.value));
        break;
      case 'smoke':
        setMaxSmoke(Number(e.target.value));
        break;
      default:
        break;
    }
  };

  // Function to handle applying changes for the given control
  const applyChanges = (control) => {
    setModalConfirm(true);
    setAuto(control);
  };

  const handleConfirm = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/room-automatized/${roomId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
          body: JSON.stringify({
            "automatizedTemperature": temperatureControl,
            "automatizedHumidity": humidityControl,
            "automatizedSmoke": smokeControl,
            "minTemperature": minTemperature,
            "maxTemperature": maxTemperature,
            "minHumidity": minHumidity,
            "maxHumidity": maxHumidity,
            "maxSmoke": maxSmoke
          })
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

    
        if (response.ok) {
          Toastify.success(`Room ${auto} automation updated successfully`);
        }

      } catch (error) {
        Toastify.warning('Error fetching rooms:', error)
        console.error('Error fetching rooms:', error);
      }

      setModalConfirm(false);
    }
    fetchData();
  
};


  return (
    <div>

      {/* Room Details Content */}
      <div className='room-details-content'>
        <h2 className='Page-Title'>{room.roomName} Automation</h2>  {/* mudar o nome "Kitchen" conforme a sala selecionada */}

        {/* Temperature Control */}
        <div className='control-section'>
          <h3 className='Title-Section'>Temperature Control</h3>
          <p className='status-control'>Status: {temperatureControl ? 'Activated' : 'Deactivated'}</p>
          <button className={`status-control-button ${temperatureControl ? 'activate' : 'deactivate'}`} onClick={() => toggleControl('temperature')}>
            {temperatureControl ? 'Deactivate' : 'Activate'}
          </button>

          {/* Min and Max Temperature Fields */}
          {temperatureControl && (
            <div className='min-max-fields'>
              <div className='field'>
                <label>Min Temperature:</label>
                <input
                  className='adjustable-field'
                  type="number"
                  value={minTemperature}
                  onChange={(e) => handleMinChange(e, 'temperature')}
                />
              </div>
              <div className='field'>
                <label>Max Temperature:</label>
                <input 
                  className='adjustable-field'
                  type="number"
                  value={maxTemperature}
                  onChange={(e) => handleMaxChange(e, 'temperature')}
                />
              </div>
              <button className='apply' onClick={() => applyChanges('smoke')}>Apply</button>
            </div>
          )}
        </div>

        {/* Humidity Control */}
        <div className="control-section">
          <h3 className='Title-Section'>Humidity Control</h3>
          <p className='status-control'>Status: {humidityControl ? 'Activated' : 'Deactivated'}</p>
          <button className={`status-control-button ${humidityControl ? 'activate' : 'deactivate'}`} onClick={() => toggleControl('humidity')}>
            {humidityControl ? 'Deactivate' : 'Activate'}
          </button>

          {/* Min and Max Humidity Fields */}
          {humidityControl && (
            <div className='min-max-fields'>
              <div className='field'>
                <label>Min Humidity :</label>
                <input
                  className='adjustable-field'
                  type="number"
                  value={minHumidity}
                  onChange={(e) => handleMinChange(e, 'humidity')}
                />
              </div>
              <div className='field'>
                <label>Max Humidity:</label>
                <input
                  className='adjustable-field'
                  type="number"
                  value={maxHumidity}
                  onChange={(e) => handleMaxChange(e, 'humidity')}
                />
              </div>
              <button className='apply' onClick={() => applyChanges('smoke')}>Apply</button>
            </div>
          )}
        </div>

        {/* Smoke Control */}
        <div className="control-section">
          <h3 className='Title-Section'>Smoke Control</h3>
          <p className='status-control'>Status: {smokeControl ? 'Activated' : 'Deactivated'}</p>
          <button className={`status-control-button ${smokeControl ? 'activate' : 'deactivate'}`} onClick={() => toggleControl('smoke')}>
            {smokeControl ? 'Deactivate' : 'Activate'}
          </button>

          {/* Min and Max Smoke Fields */}
          {smokeControl && (
            <div className='min-max-fields'>
              <div className='field'>
                <label>Max Smoke:</label>
                <div>
                  <input
                    className='adjustable-field'
                    type="number"
                    value={maxSmoke}
                    onChange={(e) => handleMaxChange(e, 'smoke')}
                  />
                </div>
              </div>
              <button className='apply' onClick={() => applyChanges('smoke')}>Apply</button>
            </div>
          )}
        </div>
        <Modal
      open={modal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ borderRadius:'5px', width: 600, p: 1, backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>        

         <CloseIcon    onClick={handleCloseModal}
         sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 1,
            cursor: 'pointer',
            
          }}/>
        <Typography id="modal-modal-title" variant="h6" component="h5">
         Confirm if you want to {cont ? 'activate' : 'deactivate'} {room.roomName} {controlo} automation.
        </Typography>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '5px' }}>
          <button className="btn-confirmation-delRooms" id="AddDeviceRoom" style={{ margin: '10px',borderRadius:'5px', backgroundColor:"green !important"}} onClick={handleConfirmModal} >Confirm</button>
          <button className="btn-confirmation-delRooms" id="delRoomYes" style={{ margin: '10px', borderRadius:'5px'}} onClick={handleCloseModal} >Cancel</button>
        </div>

      </Box>
    </Modal>
    <Modal
      open={modalConfirm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ borderRadius:'5px', width: 600, p: 1, backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>        

         <CloseIcon    onClick={handleCloseModalConfirm}
         sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 1,
            cursor: 'pointer',
            
          }}/>
        <Typography id="modal-modal-title" variant="h6" component="h5">
         Confirm if you want alter the values for {room.roomName} {auto} automation.
        </Typography>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '5px' }}>
          <button className="btn-confirmation-delRooms" id="AddDeviceRoom" style={{ margin: '10px',borderRadius:'5px', backgroundColor:"green !important"}} onClick={handleConfirm} >Confirm</button>
          <button className="btn-confirmation-delRooms" id="delRoomYes" style={{ margin: '10px', borderRadius:'5px'}} onClick={handleCloseModalConfirm} >Cancel</button>
        </div>

      </Box>
    </Modal>
      </div>
    </div>
    
  );
};

export default RoomDetailsPage;

