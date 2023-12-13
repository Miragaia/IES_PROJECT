import React, { useState } from 'react';
import '../Css/Dashboard.css'; // Import the CSS file
import RoomSelector from './RoomSelector';
import DeviceInfo from './DeviceInfo';
import ReportsSection from './ReportsSection';
import NotificationsSection from './NotificationsSection';
import GraphicSection from './GraphicSection';


const Dashboard = () => {
  const [showReports, setShowReports] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [showGraphicSection, setShowGraphicSection] = useState(true);

  const toggleReports = () => {
    setShowReports(!showReports);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleGraphicSection = () => {
    setShowGraphicSection(!showGraphicSection);
  };

  return (
    <div className="dashboard-container">
      <h2 className='dash-title'>Dashboard</h2>

      {/* Room Selector */}
      <RoomSelector />

      {/* Device Information */}
      <DeviceInfo />

      {/* Toggle Sections */}
      <div className="toggle-buttons">
        <button id="hideRep" onClick={toggleReports} data-action={showReports ? 'Hide' : 'Show'}>
          {showReports ? 'Hide Reports' : 'Show Reports'}
        </button>
        <button id="hideNot" onClick={toggleNotifications} data-action={showNotifications ? 'Hide' : 'Show'}>
          {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
        </button>
        <button id="hideGrafSec" onClick={toggleGraphicSection} data-action={showGraphicSection ? 'Hide' : 'Show'}>
          {showGraphicSection ? 'Hide Graphic Section' : 'Show Graphic Section'}
        </button>
      </div>


      {/* Sections Side by Side */}
      <div className="sections-container">
        {/* Reports Section */}
        {showReports && <ReportsSection />}

        {/* Notifications Section */}
        {showNotifications && <NotificationsSection />}

        {/* Graphic Section */}
        {showGraphicSection && <GraphicSection />}
      </div>
    </div>
  );
};

export default Dashboard;
