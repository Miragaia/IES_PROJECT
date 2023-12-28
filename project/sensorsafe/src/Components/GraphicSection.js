// GraphicSection.jsx

import React from 'react';
import ApexChart from './ApexChart';
import '../Css/ReportsSection.css';

const GraphicSection = ({selectedSensor}) => {
  // Implementation for displaying graphics
  console.log('sensoerGera: ', selectedSensor);

  return (
    <div>
      <h3 id='graficozee'>Graphic Section</h3>

      <ApexChart />
    </div>
  );
};

export default GraphicSection;
