import React, { useEffect, useState } from 'react';
import "../Css/Rooms.css"; // Importe o arquivo CSS
import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'
import Card from './CardDevices';
import { useNavigate } from 'react-router-dom';
import Toastify from './Toastify';


const Devices = () => {
    const [device, setDevice] = useState([]);
    const [sensor, setSensor] = useState([]); 
    const [available, setAvailable] = useState([]);

    const [devices, setDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState('HUMIDITY');
    const navigate = useNavigate();
  
    const handleItemClick = (itemName) => {
      setSelectedItem(itemName);
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(`Key: ${key}, Value: ${value}`);
      }
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

  useEffect(() => {
    // Fetch rooms data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/devices/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });

        const data_f1 = await response.json();

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setDevice(data_f1); // Add new elements to the existing list

      } catch (error) {
        Toastify.warning('Error fetching devices:', error);
        console.error('Error fetching devices:', error);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {

    const fetchData2 = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/devices/sensors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });
  
        const data_f2 = await response.json();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        setSensor(data_f2); // Add new elements to the existing list
      } catch (error) {
        Toastify.warning('Error fetching devices:', error);
        console.error('Error fetching devices:', error);
      }
    }
    fetchData2();
  
  }, []);

  useEffect(() => {
    const fetchData3 = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/devices/available', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });
  
        const data_f3 = await response.json();
        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        setAvailable(data_f3); // Add new elements to the existing list
      } catch (error) {
        Toastify.warning('Error fetching devices:', error);
        console.error('Error fetching devices:', error);
      }
    }
    fetchData3();
  }, []);

  useEffect(() => {
    // Combine device, sensor, and available data
    const combinedData = [...device, ...sensor, ...available];
    
    // Atualiza o estado 'devices' com os dados combinados
    setDevices(combinedData);
  }, [device, sensor, available]);

    return (
      <div className="Rooms"> 
       <nav id="nav1">
          <ul className="nav-links-Rooms">
            <li id="HUMIDITY" className={selectedItem === 'HUMIDITY' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('HUMIDITY')}>HUMIDITY</Link>
            </li>
            <li id="TEMPERATURE" className={selectedItem === 'TEMPERATURE' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('TEMPERATURE')}>TEMPERATURE</Link>
            </li>
            <li id="SMOKE" className={selectedItem === 'SMOKE' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('SMOKE')}>SMOKE</Link>
            </li>
            <li id="OTHERS" className={selectedItem === 'OTHERS' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('OTHERS')}>OTHERS</Link>
            </li>
          </ul>
        </nav>
        <div className="search-bar">
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
  
        
        <div className="content">
          {selectedItem === 'HUMIDITY' ? (
            <>
              <div className="room-devices-cards-container">
                {devices.length > 0 ? (
                  devices.some(device => device.category === 'HUMIDITY') ? (
                    devices
                          .filter(device => device.category === 'HUMIDITY')
                          .map((device) => (
                            console.log(device),
                            <Card key={device.deviceId} item={device} />
                          ))
                  ) : (              
                    <div>                  
                      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>No devices available to display in this category.</div>
                    </div>
                  )
                ) : (
                  <div style={{marginjustifyContent: 'center', alignItems: 'center', width: '100%', marginLeft: '20px'}}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}> No devices to display.</div>
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}> Click on the button below to create a new device.</div>
                  </div>
                )}
               
                <button className="btn edit-button add-product" onClick={() => (navigate('/create_device'))}>
                  <i className="animation"></i>Create device +<i className="animation"></i>
                </button>
  
              </div>
              
            </>
          ) : selectedItem === 'TEMPERATURE' ? (
            <>
              <div className="room-devices-cards-container">
                {devices.length > 0 ? (
                  devices.some(device => device.category === 'TEMPERATURE') ? (
                    devices
                          .filter(device => device.category === 'TEMPERATURE')
                          .map((device) => (
                            console.log(device),
                            <Card key={device.deviceId} item={device} />
                          ))
                  ) : (              
                    <div>                  
                      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>No devices available to display in this category.</div>
                    </div>
                  )
                ) : (
                  
                  <div style={{marginjustifyContent: 'center', alignItems: 'center', wdeviceIdth: '100%', marginLeft: '20px'}}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}> No devices to display.</div>
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}> Click on the button below to create a new device.</div>
                  </div>
                  
                )}
               
                <button className="btn edit-button add-product" onClick={() => (navigate('/create_device'))}>
                  <i className="animation"></i>Create device +<i className="animation"></i>
                </button>
  
              </div>
              
            </>
          ) : selectedItem === 'SMOKE' ? (
            <>
              <div className="room-devices-cards-container">
                {devices.length > 0 ? (
                  devices.some(device => device.category === 'SMOKE') ? (
                    devices
                          .filter(device => device.category === 'SMOKE')
                          .map((device) => (
                            console.log(device),
                            <Card key={device.deviceId} item={device} />
                          ))
                  ) : (              
                    <div>                  
                      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>No devices available to display in this category.</div>
                    </div>
                  )
                ) : (
                  <div style={{marginjustifyContent: 'center', alignItems: 'center', wdeviceIdth: '100%', marginLeft: '20px'}}>
                  <div style={{ textAlign: 'center', fontWeight: 'bold' }}> No devices to display.</div>
                  <div style={{ textAlign: 'center', fontWeight: 'bold' }}> Click on the button below to create a new device.</div>
                </div>
                )}
               
                <button className="btn edit-button add-product" onClick={() => (navigate('/create_device'))}>
                  <i className="animation"></i>Create device +<i className="animation"></i>
                </button>
  
              </div>
              
            </>
          ) : (
            <>
            <div className="room-devices-cards-container">
              {devices.length > 0 ? (
                devices.some(device => device.category === 'OTHERS') ? (
                  devices
                        .filter(device => device.category === 'OTHERS')
                        .map((device) => (
                          console.log(device),
                          <Card key={device.id} item={device} />
                        ))
                ) : (              
                  <div>                  
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>No devices available to display in this category.</div>
                  </div>
                )
              ) : (
                <div style={{marginjustifyContent: 'center', alignItems: 'center', width: '100%', marginLeft: '20px'}}>
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}> No devices to display.</div>
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}> Click on the button below to create a new device.</div>
              </div>
              )}
             
              <button className="btn edit-button add-product" onClick={() => (navigate('/create_device'))}>
                <i className="animation"></i>Create device +<i className="animation"></i>
              </button>

            </div>
            
          </>
          )}
        </div>
  
      </div>
      
    );
  };

export default Devices;
