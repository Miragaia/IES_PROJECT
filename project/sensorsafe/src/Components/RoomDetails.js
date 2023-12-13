import React, { useState } from 'react';
import "../Css/RoomDetails.css"; // Importe o arquivo CSS
import { Link } from 'react-router-dom'; // Importe useNavigate do 'react-router-dom'
import DeviceCard from './Card';


// RoomDetailsPage.jsx

const RoomDetailsPage = () => {
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

  // Function to toggle the activation status
  const toggleControl = (control) => {
    switch (control) {
      case 'temperature':
        setTemperatureControl(!temperatureControl);
        break;
      case 'humidity':
        setHumidityControl(!humidityControl);
        break;
      case 'smoke':
        setSmokeControl(!smokeControl);
        break;
      default:
        break;
    }
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
    // Logic to apply changes to the database
    console.log(`Applying changes for ${control}`);
    // You can add logic here to store the values in the database
  };

  return (
    <div>

      {/* Room Details Content */}
      <div className='room-details-content'>
        <h2 className='Page-Title'>Kitchen Automation</h2>  {/* mudar o nome "Kitchen" conforme a sala selecionada */}

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
      </div>
    </div>
  );
};

export default RoomDetailsPage;

