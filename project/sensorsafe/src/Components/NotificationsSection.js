// NotificationsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotificationsSection = () => {
  // Dummy data for notifications (replace with actual notifications data)
  const notifications = [
    { id: 1, date: '2023-11-15', title: 'Notification 1', description: 'Description 1' },
    { id: 2, date: '2023-11-16', title: 'Notification 2', description: 'Description 2' },
    { id: 3, date: '2023-11-17', title: 'Notification 3', description: 'Description 3' },
  ];

  return (
    <div className="notifications-section-container">
      <h3>Notifications Section</h3>
      <div className="notifications-container">
        {notifications.map((notification) => (
          <Link key={notification.id} to={`/notification-detail/${notification.id}`} className="notification-item">
            <div className="notification-date">{notification.date}</div>
            <div className="notification-title">{notification.title}</div>
            <div className="notification-description">{notification.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSection;
