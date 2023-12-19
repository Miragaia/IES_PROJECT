// ReportsSection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toastify from './Toastify';

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
      <h3>Reports Section</h3>
      <div>
        <button
          className="generate-report-button"
          onClick={handleGenerateReportMan}
          disabled={isGeneratingReport}
        >
          {isGeneratingReport ? 'Generating Maintenance Report...' : 'Generate Maintenance Report'}
        </button>
      </div>
      {/* Button to generate Maintenance Report */}
      
      <div>
        {/* Button to generate Status Report */}
        <button
          className="generate-report-button"
          onClick={handleGenerateReportStats}
          disabled={isGeneratingReport}
        >
          {isGeneratingReport ? 'Generating Status Report...' : 'Generate Status Report'}
        </button>
      </div>     
    </div>
  );



  // return (
  //   <div className="reports-section-container">
  //     <h3>Reports Section</h3>

  //     {/* Button to generate reports */}
  //     <button
  //       className="generate-report-button"
  //       onClick={handleGenerateReport}
  //       disabled={isGeneratingReport}
  //     >
  //       {isGeneratingReport ? 'Generating Report...' : 'Generate Report'}
  //     </button>

  //     {/* Display reports */}
  //     <div className="reports-container">
  //       {reports.map((report, index) => (
  //         <Link key={index} to={`/report-detail/${index}`} className="report-item">
  //           {report}
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default ReportsSection;



