// ReportsSection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toastify from './Toastify';

const ReportsSection = () => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Dummy data for reports (replace with actual reports data)
  const reports = ['Report 1', 'Report 2', 'Report 3'];

  const handleGenerateReport = () => {
    // Add logic to make an API call to trigger report generation
    // Set isGeneratingReport to true while waiting for the response
    setIsGeneratingReport(true);

    // Example: Use fetch or your preferred HTTP library
    const response = fetch('http://localhost:8080/sensorsafe/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
      },
      // body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Error generating report');
    }


      // .then((response) => response.json())
      // .then((data) => {
      //   console.log('Report generated:', data);
      //   // Handle the generated report data as needed

      //   // Set isGeneratingReport back to false after handling the report
      //   setIsGeneratingReport(false);
      // })
      // .catch((error) => {
      //   console.error('Error generating report:', error);
      //   // Handle errors

      //   // Set isGeneratingReport back to false in case of an error
      //   setIsGeneratingReport(false);
      // });
  };






  return (
    <div className="reports-section-container">
      <h3>Reports Section</h3>

      {/* Button to generate reports */}
      <button
        className="generate-report-button"
        onClick={handleGenerateReport}
        disabled={isGeneratingReport}
      >
        {isGeneratingReport ? 'Generating Report...' : 'Generate Report'}
      </button>

      {/* Display reports */}
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



