// ReportsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ReportsSection = () => {
  // Dummy data for reports (replace with actual reports data)
  const reports = ['Report 1', 'Report 2', 'Report 3'];

  return (
    <div className="reports-section-container">
      <h3>Reports Section</h3>
      <div className="reports-container">
        {reports.map((report, index) => (
          <Link key={index} to={`/report-detail/${index}`} className="report-item">
            {report}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReportsSection;


