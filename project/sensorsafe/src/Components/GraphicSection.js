// GraphicSection.jsx

import React from 'react';
import ApexChart from './ApexChart';

const GraphicSection = ({selectedSensor}) => {
  // Implementation for displaying graphics
  console.log('sensoerGera: ', selectedSensor);

  return (
    <div>
      <h3>Graphic Section</h3>

      <ApexChart />
    </div>
  );
};

export default GraphicSection;
