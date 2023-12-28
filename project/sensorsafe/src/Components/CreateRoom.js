import React, {useState, useEffect} from 'react';
import '../Css/CreateRoom.css';
import { useNavigate } from 'react-router-dom';
import Toastify from './Toastify';


function CreateRoom() {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({
      temperature: false,
      humidity: false,
      smoke: false,
    });
    const [showHumidityInputs, setShowHumidityInputs] = useState(false);
    const [showTemperatureInputs, setShowTemperatureInputs] = useState(false);
    const [showSmokeInputs, setShowSmokeInputs] = useState(false);
    const [minHumidityValue, setMinHumidityValue] = useState(0);
    const [maxHumidityValue, setMaxHumidityValue] = useState(0);
    const [minTemperatureValue, setMinTemperatureValue] = useState(0);
    const [maxTemperatureValue, setMaxTemperatureValue] = useState(0);
    const [maxSmokeValue, setMaxSmokeValue] = useState(0);

    const handleCategoryClick = (category) => {
      setSelectedCategory(category);

    };
    
    const handleShowHumidityInputs = (e) => {
      e.preventDefault(); // Evita a submissão do formulário
      setShowHumidityInputs(!showHumidityInputs);
      console.log("VAR",showHumidityInputs)
      
    };
  
    const handleShowTemperatureInputs = (e) => {
      e.preventDefault();
      setShowTemperatureInputs(!showTemperatureInputs);
    };
  
    const handleShowSmokeInputs = (e) => {
      e.preventDefault();
      setShowSmokeInputs(!showSmokeInputs);
    };
    

    
    const handleCategoryClickYes = (category) => {
      setSelectedCategory(category);

      }
    
    const handleAddItem = async (e) => {
      console.log('maxHumidityValue:', parseInt(maxHumidityValue));
      console.log('maxSmokeValue:', maxSmokeValue);
      console.log('maxTemperatureValue:', maxTemperatureValue);
      console.log('minHumidityValue:', minHumidityValue);
      console.log('minTemperatureValue:', minTemperatureValue);

      e.preventDefault();
    
      const formData = new FormData(e.currentTarget);
      console.log()
    
      try {
        const response = await fetch('http://localhost:8080/api/rooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
            
          },
          body: JSON.stringify({
            roomName: formData.get('roomName'),

            automatized: {
              automatizedHumidity: showHumidityInputs,
              automatizedSmoke: showSmokeInputs,
              automatizedTemperature: showTemperatureInputs,
              maxHumidity: parseInt(maxHumidityValue),
              maxSmoke: parseInt(maxSmokeValue),
              maxTemperature: parseInt(maxTemperatureValue),
              minHumidity: parseInt(minHumidityValue),
              minTemperature: parseInt(minTemperatureValue),

            },
            
            stats: {
              temperature: 0,
              humidity: 0,
              smoke: 0,
            },
              
          }),
          
        });

        

        console.log('response', response)
        if (!response.ok) {
          Toastify.error('Room creation failed, try again');
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();



        if (data && data.message === 'Room as been created successfully') {

          Toastify.success('Room as been created successfully');

          navigate('/rooms');
        } else {

          Toastify.error('Error: ' + data.message);
        }
        
      } catch (error) {
        console.log(error);
        Toastify.info('Error connecting to server');
        console.log('Error in auth/signup post', error);
      }
    };


    return (
      <div className='additem-page-room'>
        <div className='additem-modal-room'>
          <h3>Create Room</h3>
          <form onSubmit={handleAddItem} encType="multipart/form-data">
            <div className='form-group-item-room'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='roomName'
                name='roomName'
                required
              />
            </div>
            <div className='category-selection-room'>
              <h2>Automatized</h2>
              <div className='category-options-room'>
                <span className={`category-option-room ${selectedCategory === true ? 'active' : ''}`} onClick={() => handleCategoryClick(true)}>True</span>
                <span className={`category-option-room ${selectedCategory === false ? 'active' : ''}`} onClick={() => handleCategoryClick(false)}>False</span>
              </div>
            </div>
            {selectedCategory === true && (
              <div className="toggle-buttons2">
              <button id="hideRep2" onClick={handleShowHumidityInputs} data-action={showHumidityInputs ? 'Hide' : 'Show'}>
                {showHumidityInputs ? 'Not Automatized Humidity' : 'Automatized Humidity'}
              </button>
              <button id="hideNot2" onClick={handleShowTemperatureInputs} data-action={showTemperatureInputs ? 'Hide' : 'Show'}>
                {showTemperatureInputs ? 'Not Automatized Temperature' : 'Automatized Temperature'}
              </button>
              <button id="hideGrafSec2" onClick={handleShowSmokeInputs} data-action={showSmokeInputs ? 'Hide' : 'Show'}>
                {showSmokeInputs ? 'Not Automatized Smoke' : 'Not Automatized Smoke'}
              </button>
            </div>
            )}
            <div className="sections-container">
              {/* Reports Section */}
              {showHumidityInputs && (
                <div className='form-group-item-room'>
                <label htmlFor='humidityValue'>Min Humidity:</label>
                <input
                  type='number'
                  id='minHumidityValue'
                  name='minHumidityValue'
                  value={minHumidityValue}
                  onChange={(e) => setMinHumidityValue(e.target.value)}
                  required
                />
                <label htmlFor='humidityValue'>Max Humidity:</label>
                <input
                  type='number'
                  id='maxHumidityValue'
                  name='maxHumidityValue'
                  value={maxHumidityValue}
                  onChange={(e) => setMaxHumidityValue(e.target.value)}
                  required
                />
              </div>
              )}

              {/* Notifications Section */}
              {showTemperatureInputs && (
                <div className='form-group-item-room'>
                  <label htmlFor='temperatureValue'>Min Temperature:</label>
                  <input
                    type='number'
                    id='minTemperatureValue'
                    name='minTemperatureValue'
                    value={minTemperatureValue}
                    onChange={(e) => setMinTemperatureValue(e.target.value)}
                    required
                  />
                  <label htmlFor='temperatureValue'>Max Temperature:</label>
                  <input
                    type='number'
                    id='maxTemperatureValue'
                    name='maxTemperatureValue'
                    value={maxTemperatureValue}
                    onChange={(e) => setMaxTemperatureValue(e.target.value)}
                    required
                  />
                </div>
              ) }

              {/* Graphic Section */}
              {showSmokeInputs && (
                <div className='form-group-item-room'>
                  <label htmlFor='smokeValue'>Max Smoke:</label>
                  <input
                    type='number'
                    id='maxSmokeValue'
                    name='maxSmokeValue'
                    value={maxSmokeValue}
                    onChange={(e) => setMaxSmokeValue(e.target.value)}
                    required
                  />
                </div>
                
              )}
            </div>

            <button className='btn edit-button addroom' type='submit'><i className="animation"></i>Add room<i className="animation"></i></button>
          </form>
        </div>
        <div className="info-saved-modal" id="success-modal" style={{ display: 'none' }}>
          <p>Room added</p>
        </div>
      </div>
    );
  }
  
  export default CreateRoom;
  
