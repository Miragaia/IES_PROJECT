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
  console.log("WHATT: ",item);

    const [deviceId, setDeviceId] = useState(null);
    const [deviceDetais, setOpendeviceDetais] = useState(false);
    const [DeleteDevice, setOpenDeleteDevice] = useState(false);

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

    const handleOpenModal = () => {
      setOpendeviceDetais(true);
    }
  
    const handleCloseModal = () => {
      setOpendeviceDetais(false);
    }

    const handleOpenModalDelDevice = () => {
      setOpenDeleteDevice(true);
    }
  
    const handleCloseModalDelDevice = () => {
      setOpenDeleteDevice(false);
    }
  
    // Atualiza o estado do deviceID quando necessário
    const handleDeviceIdClick = () => {
      setDeviceId(item.deviceId);
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
        }
    
      } catch (error) {
        Toastify.warning('Error fetching rooms:', error)
        console.error('Error fetching rooms:', error);
      }
    }

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

    


    return (
        <div className={`card`}>
            <div className="product-tumb">
                <img src={categoryImage} className="Item-foto" alt="foto" />
            </div>
            <div className="product-details">
                <h4>
                    {/*<Link  to={`/detailproduct/${editedItem.id}`}>
                        {editedItem.nome}
                    </Link>*/}
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
                                <button id="btnEditDevice" className="btn edit-button" onClick={() => window.location.href = "/editprofile"}>
                                  <i className="animation"></i>Edit Device <EditIcon sx={{ marginLeft: '5px' }} />
                                </button>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
                </Box>
              </Modal>
            </div>
        </div>
    
    );
};

export default CardDevices;
