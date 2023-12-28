// ReportsSection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toastify from './Toastify';
import '../Css/ReportsSection.css';

const ReportsSection = () => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Dummy data for reports (replace with actual reports data)
  const reports = ['Report 1', 'Report 2', 'Report 3'];

  const handleGenerateReportMan = async () => {
    // Add logic to make an API call to trigger report generation
    // Set isGeneratingReport to true while waiting for the response
    Toastify.info('Report is beeing generated, please wait a few seconds');
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

      // Trigger the download
      downloadReport(data.report_data, `report_Man.pdf`);
    }catch(error) {
      console.error('Error generating report:', error);
    }
  };

  const downloadReport = (base64Data, fileName) => {
    const blob = new Blob([base64Data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const handleGenerateReportStats = async () => {
    // Add logic to make an API call to trigger report generation
    // Set isGeneratingReport to true while waiting for the response
    Toastify.info('Report is beeing generated, please wait a few seconds');
    try {
      // Example: Use fetch or your preferred HTTP library
      const response = await fetch('http://localhost:9999/sensorsafe/generate_report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'palavra_passe_ultra_secreta',
        },
        body: JSON.stringify({
          report_type: 'stats',
          stats: [1, 2, 3],
        }),
      });

      console.log(response);
      Toastify.info('Report is beeing generated, please wait a few seconds');
      const data = await response.json();

      console.log('Report generated successfully:', data);
      // Trigger the download
      downloadReport(data.report_data, `report_Stats.pdf`);
    }catch(error) {
      console.error('Error generating report:', error);
    }
  };


  return (
    <div className="reports-section-container">
      <h3 className='rpSect'>Reports Section</h3>
      <div className='but1'>
        <button
          className="generate-report-button"
          style={buttonStyle}
          onClick={handleGenerateReportMan}
          disabled={isGeneratingReport}
          onMouseOver={(e) => { e.target.style.backgroundColor = '#45a049'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = '#4CAF50'; }}
        >
          {isGeneratingReport ? 'Generating Maintenance Report...' : 'Generate Maintenance Report'}
        </button>
      </div>
      {/* Button to generate Maintenance Report */}
      
      <div>
        {/* Button to generate Status Report */}
        <button
          className="generate-report-button"
          style={buttonStyle}
          onClick={handleGenerateReportStats}
          disabled={isGeneratingReport}
          onMouseOver={(e) => { e.target.style.backgroundColor = '#45a049'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = '#4CAF50'; }}
        >
          {isGeneratingReport ? 'Generating Status Report...' : 'Generate Status Report'}
        </button>
      </div>     
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4CAF50', // Green color, you can change it
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px', // Adjust as needed
  marginBottom: '10px', // Adjust as needed
  fontWeight: 600,
  width: '340px',
};

export default ReportsSection;



