// NotificationsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/ReportsSection.css';

const NotificationsSection = ({ notifications }) => {

  return (
    <div className="notifications-section-container">
      <h3 id='alo'>Notifications Section</h3>
      <div className="notifications-container">
        {notifications && notifications.map((notification) => (
          <div className="notification-description">{notification}</div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSection;
