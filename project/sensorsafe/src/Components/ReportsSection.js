// ReportsSection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toastify from './Toastify';

const ReportsSection = () => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Dummy data for reports (replace with actual reports data)
  const reports = ['Report 1', 'Report 2', 'Report 3'];

  const handleGenerateReport = async () => {
    // Add logic to make an API call to trigger report generation
    // Set isGeneratingReport to true while waiting for the response
    setIsGeneratingReport(true);
    try {
      // Example: Use fetch or your preferred HTTP library
      const response = await fetch('http://localhost:9999/sensorsafe/generate_report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'palavra_passe_ultra_secreta',
        },
        body: JSON.stringify({
          report_type: 'maintenance',
          stats: [1, 2, 3],
        }),
      });

      console.log(response);
      
      const data = await response.json();

      console.log('Report generated successfully:', data);
      setIsGeneratingReport(false);
    }catch(error) {
      console.error('Error generating report:', error);
      setIsGeneratingReport(false);
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



