import React, { useEffect, useState } from "react";
import '../Css/Cards.css';
import foto from '../extrator.jpg';
import { Modal, Box, Typography, IconButton, Switch } from '@mui/material';
import TEMPERATURE from '../photos/sensor_temperatura.webp';
import HUMIDITY from '../photos/sensor_humidade.webp';
import SMOKE from '../photos/sensor_fumo.jpeg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Toastify from './Toastify';

import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'

const CardDevices = ({ item }) => {

    console.log("ITEM: ",item);

    const [deviceId, setDeviceId] = useState(null);
    const [deviceDetais, setOpendeviceDetais] = useState(false);
    const [DeleteDevice, setOpenDeleteDevice] = useState(false);
    const [EditDevice, setOpenEditDevice] = useState(false);
    const [RoomRemDevice, setOpenRoomRemDevice] = useState(false);
    const [roomName, setRoomName] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(item.category);

    const [editableInfo, setEditableInfo] = useState({
      nome: item.name,
      category: item.category
    });

    let categoryImage;

  
    // Lógica para selecionar a imagem com base na categoria
    switch (item.category) {
      case 'TEMPERATURE':
        categoryImage = TEMPERATURE;
        break;
      case 'HUMIDITY':
        categoryImage = HUMIDITY;
        break;
      case 'SMOKE':
        categoryImage = SMOKE;
        break;
      default:
        // Se a categoria não for reconhecida, use uma imagem padrão
        categoryImage = foto;
    }


    const handleCategoryClick = (category) => {
      setEditableInfo({
        ...editableInfo,
        category: category
      });
      setSelectedCategory(category); 
    };
    

    const handleOpenModal = () => {
      setOpendeviceDetais(true);
    }
  
    const handleCloseModal = () => {
      setOpendeviceDetais(false);
    }

    const handleOpenModalEditDevice = () => {
      setOpenEditDevice(true);
    }
  
    const handleCloseModalEditDevice = () => {
      setOpenEditDevice(false);
    }

    const handleOpenModalDelDevice = () => {
      setOpenDeleteDevice(true);
    }
  
    const handleCloseModalDelDevice = () => {
      setOpenDeleteDevice(false);
    }

    const handleOpenModalRoomRemDevice = () => {
      setOpenRoomRemDevice(true);
    }

    const handleCloseModalRoomRemDevice = () => {
      setOpenRoomRemDevice(false);
    }
  
    // Atualiza o estado do deviceID quando necessário
    const handleDeviceIdClick = () => {
      setDeviceId(item.deviceId);
    };

    
    const handleRemFromRoom = async (deviceId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/devices/device/remove-room/${deviceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });
    
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (responseData.message === 'Room ID removed from the device successfully'){
          Toastify.success('Room ID removed from the device successfully');
          setOpenRoomRemDevice(false);
          setOpendeviceDetais(false);
          window.location.reload();
        }

      } catch (error) {
        Toastify.warning('Error updating device:', error);
        console.error('Error updating device:', error);
      }
    };

    const handleRoomNameClick = async (roomId) => {
      console.log("ENTREI: ", roomId);
      try{
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
    
        console.log('Room name:', data);
        setRoomName(data.roomName);
      }
      catch (error) {
        Toastify.warning('Error fetching rooms:', error)
        console.error('Error fetching rooms:', error);
      }
    };

    const handleDeleteDevice= async (deviceId) => {

      console.log("ALO: ",deviceId);
      
      
        try{
          const response = await fetch(`http://localhost:8080/api/devices/available/${deviceId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
            },
            
        });
    
        const acess_data = await response.json();
    
        console.log("OLHA: ",acess_data)
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (acess_data.message === 'Device successfully removed.'){
          Toastify.success('Device successfully removed.');
          setOpenDeleteDevice(false);
          setOpendeviceDetais(false);
          window.location.reload();
        }
    
      } catch (error) {
        Toastify.warning('Error fetching rooms:', error)
        console.error('Error fetching rooms:', error);
      }
    }

    const saveChanges = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/devices/device/edit/${item.deviceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('Token:'),
          },
          body: JSON.stringify({
            name: editableInfo.nome,
            category: editableInfo.category
          })
        });
    
        const responseData = await response.json();
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        // Handle success message or other logic after editing the device
        console.log('Device updated successfully:', responseData);
    
        // Close the edit modal
        handleCloseModalEditDevice();
        window.location.reload();
      } catch (error) {
        Toastify.warning('Error updating device:', error);
        console.error('Error updating device:', error);
      }
    };

    useEffect(() => {
      
      if (item.roomID) {

        handleRoomNameClick(item.roomID);
      }
    }, [item.roomID]);
    

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

    const style2 = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 1000,
      height: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const resetFields = () => {
      setEditableInfo({
        nome: item.name,
        category: item.category
      });
  }

    


    return (
        <div className={`card`}>
            <div className="product-tumb">
                <img src={categoryImage} className="Item-foto" alt="foto" />
            </div>
            <div className="product-details">
                <h4>
                    <Link onClick={handleOpenModal}>
                        {item.name}
                    </Link>
                </h4>
                <Modal
                open={deviceDetais}
                aria-labelledby="modal-modal-title-delRooms"
                aria-describedby="modal-modal-description-delRooms"
              >
                <Box sx={style2}>
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

                  <div className="DetailProductPage">
                    <h2 className='detailproduct-title'>Device Details</h2>
                      <div className="productdetail-container">
                        <div className="productdetail-card">
                            <div className="left-detail">
                              <img src={categoryImage} alt="foto" className="detailproduct-image"/>
                            </div>
                            <div className="right-detail">
                              <h2>{item.name}</h2>
                              <p><span className="category-label">Category:</span> {item.category}</p>
                              {item.roomID && (
                              <p><span className="room-label">Room:</span> {roomName || 'Loading...'}</p>
                              )}
                              <div className="button-container">
                                <div className='deleteRoom-button'>
                                  <button id="btnDeleteDevice" className='btn-other deleteRoom-button' onClick={() => handleOpenModalDelDevice()}>
                                    <DeleteIcon sx={{ marginRight: '5px' }} /> Delete Device
                                  </button>
                                  <Modal
                                    open={DeleteDevice}
                                    aria-labelledby="modal-modal-title-delRooms"
                                    aria-describedby="modal-modal-description-delRooms"
                                  >
                                    <Box sx={style}>
                                      <IconButton
                                        aria-label="close"
                                        onClick={handleCloseModalDelDevice}
                                        sx={{position: 'absolute', top: 0, right: 0,}}
                                      >
                                      x
                                      </IconButton>
                                      <Typography id="modal-modal-title-delRooms" variant="h6" component="h5">
                                        Are you sure you want to delete this device?
                                      </Typography>
                                      <div className="modal-buttons-delRooms">
                                        <button id="delRoomYes" className="btn-confirmation-delRooms" onClick={() => handleDeleteDevice(item.deviceId)}>
                                          Yes
                                        </button>
                                        <button id ="delRoomNo" className="btn-confirmation-delRooms" onClick={handleCloseModalDelDevice}>
                                          No
                                        </button>
                                      </div>                                     
                                    </Box>
                                  </Modal>
                                </div>
                                <button id="btnEditDevice" className="btn edit-button" onClick={() => {handleCloseModal();handleOpenModalEditDevice();}}>
                                  <i className="animation"></i>Edit Device <EditIcon sx={{ marginLeft: '5px' }} />
                                </button>
                              </div>
                              {item.roomID && (
                              <button id="btnRoomRemDevice" className='btn-other deleteRoom-button' onClick={() => handleOpenModalRoomRemDevice()}>
                                    <DeleteIcon sx={{ marginRight: '5px' }} /> Remove Device from current room
                              </button>
                              )}
                            </div>
                        </div>
                      </div>
                  </div>
                </Box>
              </Modal>

              <Modal
                open={EditDevice}
                aria-labelledby="modal-modal-title-EditDevices"
                aria-describedby="modal-modal-description-EditDevices"
              >
                <Box sx={style2}>
                  <IconButton
                    aria-label="close"
                    onClick={() => {handleOpenModal();handleCloseModalEditDevice();}}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  >
                  x
                  </IconButton>

                  <div className="DetailProductPage">
                    <h2 className='detailproduct-title'>Edit Your Device</h2>
                      <div className="productdetail-container">
                        <div className="productdetail-card">
                            <div className="left-detail">
                              <img src={categoryImage} alt="foto" className="detailproduct-image"/>
                            </div>
                            <div className="right-detail">
                              <div className="form-row" style={{ marginTop: '1rem' }}>
                                <input
                                  type="text"
                                  value={editableInfo.nome || ''}
                                  onChange={(e) => setEditableInfo({ ...editableInfo, nome: e.target.value })}
                                />
                              </div>
                              {item.category !== 'OTHERS' && (
                                <div className="form-row">
                                  <p>Category:</p>
                                  <div className='category-options1'>
                                    <span className={`category-option1 ${selectedCategory === 'HUMIDITY' ? 'active' : ''}`} onClick={() => handleCategoryClick('HUMIDITY')}>HUMIDITY</span>
                                    <span className={`category-option1 ${selectedCategory === 'TEMPERATURE' ? 'active' : ''}`} onClick={() => handleCategoryClick('TEMPERATURE')}>TEMPERATURE</span>
                                    <span className={`category-option1 ${selectedCategory === 'SMOKE' ? 'active' : ''}`} onClick={() => handleCategoryClick('SMOKE')}>SMOKE</span>
                                  </div>
                                </div>
                              )}

                              <div className="form-row">
                                <button className="btn edit-button" onClick={saveChanges}><i className="animation"></i>Save Changes<i className="animation"></i></button>
                                <button className="btn edit-button" onClick={resetFields}><i className="animation"></i>Reset Fields<i className="animation"></i></button>
                              </div>
                              
                              
                            </div>
                        </div>
                      </div>
                  </div>
                </Box>
              </Modal>
              <Modal
                open={RoomRemDevice}
                aria-labelledby="modal-modal-title-delRooms"
                aria-describedby="modal-modal-description-delRooms"
              >
                <Box sx={style}>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseModalRoomRemDevice}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  >
                  x
                  </IconButton>
                  <Typography id="modal-modal-title-delRooms" variant="h6" component="h5">
                    Are you sure you want to remove the device from the current room?
                  </Typography>
                  <div className="modal-buttons-delRooms">
                    <button id="remRoomYes" className="btn-confirmation-delRooms" onClick={() => handleRemFromRoom(item.deviceId)}>
                      Yes
                    </button>
                    <button id ="remRoomNo" className="btn-no-delRooms" onClick={handleCloseModalRoomRemDevice}>
                      No
                    </button>
                  </div>
                  

                </Box>
              </Modal>
            </div>
        </div>
    
    );
};

export default CardDevices;
