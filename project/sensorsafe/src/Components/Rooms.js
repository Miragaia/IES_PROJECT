import React, { useState } from 'react';
import "../Css/Rooms.css"; // Importe o arquivo CSS
import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'
import DeviceCard from './Card';


const Rooms = () => {
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState('devices');

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

  return (
    <div className="Rooms"> 
     <nav id="nav1">
        <ul className="nav-links-Rooms">
          <li id="bath" className={selectedItem === 'devices' ? 'active' : ''}>
            <Link onClick={() => handleItemClick('devices')}>Bathroom</Link>
          </li>
          <li id="kitchen" className={selectedItem === 'rooms' ? 'active' : ''}>
            <Link onClick={() => handleItemClick('rooms')}>Kitchen</Link>
          </li>
          <li id="bedroom" className={selectedItem === 'reports' ? 'active' : ''}>
            <Link onClick={() => handleItemClick('reports')}>Bedroom</Link>
          </li>
          <li id="addroom" className={selectedItem === 'addRoom' ? 'active' : ''}>
            <Link onClick={() => handleAddItem('reports')}>Add Room +</Link>
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
              <button className="btn edit-button add-product">
                <i className="animation"></i>Add Device +<i className="animation"></i>
              </button>

            </div>
            
          </>
        ) : selectedItem === 'rooms' ? (
          <>
            {/* Conteúdo para a opção 'rooms' */}
          </>
        ) : selectedItem === 'reports' ? (
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

export default Rooms;
