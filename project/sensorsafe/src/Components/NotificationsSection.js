// NotificationsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotificationsSection = ({ notifications }) => {

  return (
    <div className="notifications-section-container">
      <h3>Notifications Section</h3>
      <div className="notifications-container">
        {notifications && notifications.map((notification) => (
          <div className="notification-description">{notification}</div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSection;
