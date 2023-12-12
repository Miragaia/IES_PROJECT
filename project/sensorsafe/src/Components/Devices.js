import React, { useEffect, useState } from 'react';
import "../Css/Rooms.css"; // Importe o arquivo CSS
import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'
import Card from './Card';
import { useNavigate } from 'react-router-dom';


const Devices = () => {
    const [devices, setDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState('humidity');
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
  
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(data);
        setDevices(data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    }
    fetchData();

    const fetchData2 = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/devices/sensors', {
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
        console.log(data);
        // adiciona ao set de devices
        setDevices(data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    }
    fetchData2();

    const fetchData3 = async () => {
      try {
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
        console.log(data);
        // adiciona ao set de devices
        setDevices(data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    }
    fetchData3();
  }, []);
  
    return (
      <div className="Rooms"> 
       <nav id="nav1">
          <ul className="nav-links-Rooms">
            <li id="humidity" className={selectedItem === 'humidity' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('humidity')}>Humidity</Link>
            </li>
            <li id="temperature" className={selectedItem === 'temperature' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('temperature')}>Temperature</Link>
            </li>
            <li id="smoke" className={selectedItem === 'smoke' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('smoke')}>Smoke</Link>
            </li>
            <li id="others" className={selectedItem === 'others' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('others')}>Others</Link>
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
  
        {/* Renderização condicional do conteúdo */}
        <div className="content">
          {selectedItem === 'humidity' ? (
            <>«
              <div className="room-devices-cards-container">
                {Array.isArray(devices) && devices.length > 0 ? (
                  devices.map((item, index) => (
                    <Card key={index} item={item} />
                  ))
                ) : (
                  <div>
                    
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>No products available to display.</div>
                  </div>
                )}
              
               
                <button className="btn edit-button add-product" onClick={() => (navigate('/create_device'))}>
                  <i className="animation"></i>Create device +<i className="animation"></i>
                </button>
  
              </div>
              
            </>
          ) : selectedItem === 'temperature' ? (
            <>
              {/* Conteúdo para a opção 'rooms' */}
            </>
          ) : selectedItem === 'smoke' ? (
            <>
              {/* Conteúdo para a opção 'reports' */}
            </>
          ) : (
            <>
              {/* Conteúdo padrão caso nenhuma opção selecionada */}
            </>
          )}
        </div>
  
      </div>
      
    );
  };

export default Devices;
