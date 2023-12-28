import React, { useState, useEffect } from 'react';
import '../Css/Dashboard.css'; // Import the CSS file
import ReportsSection from './ReportsSection';
import NotificationsSection from './NotificationsSection';
import GraphicSection from './GraphicSection';
import SensorsSelector from './SensorsSelector';
import { Link } from 'react-router-dom';
import Toastify from './Toastify';
import '../Css/RoomSelector.css'; // Import the CSS file
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"; 
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import io from 'socket.io-client';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemText } from '@mui/material';

const Dashboard = () => {
  const [showReports, setShowReports] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [showGraphicSection, setShowGraphicSection] = useState(true);
  const [selectedItem, setSelectedItem] = useState('rooms');
  const [numberOfDevices, setNumberOfDevices] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [sensors, setSensor] = useState([]);
  const [RoomType, setRoomType] = useState(['TEMPERATURE', 'SMOKE', 'HUMIDITY']);
  const [sensorValue, setsensorValue] = useState([]);
  const [date, setDate] = useState([]);

  const [sensorType, setSensorType] = useState([]);


  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedType, setSelectedType] = useState('TEMPERATURE');

  const [rooms, setRooms] = useState([]);

  const [NotificationsRoom, setNotificationsRoom] = useState([]);
  const [array_notif, setArray_notif] = useState([]); // Array de notificações
  const [RoomSensorValues, setRoomSensorValues] = useState([]); // Array de notificações
  const [DateRoomVAlue, setDateRoomVAlue] = useState([]); // Array de notificações

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    fetchRoomDevices(room);
    console.log('Room selected:', room);
  };
  
  const handleRoomType = (room) => {
    setSelectedType(room);
  };

  const handleSensorSelection = (sensorId) => {
    console.log('Sensor selected:', sensorId);
    setSelectedSensor(sensorId);
    
  };
  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('new_notification', (data) => {
    console.log('New notification:', data);
    array_notif.push(data);
    array_notif.reverse();



    });

    return () => {
      socket.disconnect();
    }
  }, []);
  const toggleReports = () => {
    setShowReports(!showReports);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleGraphicSection = () => {
    setShowGraphicSection(!showGraphicSection);
  };

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  }



  useEffect(() => {
    // Fetch rooms data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rooms/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });
  
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        setRooms(data);        
  
        if (data.length > 0) {
          setSelectedRoom(data[0].roomId);
          fetchRoomDevices(data[0].roomId);
        }
      } catch (error) {
        Toastify.warning('Error fetching rooms:', error)
        console.error('Error fetching rooms:', error);
      }
    };
  
    fetchData();
  }, [selectedItem]);
  useEffect(() => {

    const fetchData2 = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/devices/sensors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });
  
        const data_f2 = await response.json();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("Sensors: ", data_f2);
        
        setSensor(data_f2); // Add new elements to the existing list

        if (data_f2.length > 0) {
          setSelectedSensor(data_f2[0].deviceId);
          fetchReportBySensor(data_f2[0].deviceId)
        }

      } catch (error) {
        Toastify.warning('Error fetching devices:', error);
        console.error('Error fetching devices:', error);
      }
    }
    fetchData2();
  
  }, [selectedItem]);

    useEffect(() => {
      console.log('**************************************Selected sensor:', selectedSensor);
      fetchReportBySensor(selectedSensor);
    }, [selectedSensor]);


    useEffect(() => { 
      setNotificationsRoom();
      setsensorValue([]);
      setDate([]);
      for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        if (room.roomId === selectedRoom) {
          console.log('Selected room:', room);
          for (let j = 0; j < room.devices.length; j++) {
            const device = room.devices[j];
            console.log('Device:', device);
            if (device.category === selectedType) {
              console.log('Selected device:', device);
              fetchReportBySensor2(device.deviceId);
            }
          }
        }
      }
    }, [selectedRoom,selectedType]);

    const fetchReportBySensor2 = async (sensorId) => {
      console.log('sensorId:', sensorId);
      try {
        const response = await fetch(`http://localhost:8080/sensorsafe/reports_sensors/reports/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }


        const data = await response.json();
        console.log('Reports by sensor:', data);

        const sensorValue = [];
        const date = [];
        const sensorType = [];
        const notifications = [];
        for (let i = 0; i < data.length; i++) {
          const report_data = data[i];
          if(report_data.type === 'DEVICES' && report_data.description.includes(sensorId)){
              const formattedValue = parseFloat(report_data.sensorValue).toFixed(2);
              date.push([report_data.date, parseFloat(formattedValue)]);
              // date.push(report_data.date);
              sensorType.push(report_data.sensorType);
              notifications.push(report_data.description);
            }
            else{
              console.log("Sensor não encontrado");
            }
          }
        
          setsensorValue(sensorValue);
          setDate(date); 
          // quero apenas os primerios 10notificaçoes
          notifications.reverse();
          setNotificationsRoom(notifications);
        

         // Isso retornará o número de dispositivos associados ao roomId
      } catch (error) {
        console.error('Error fetching reports by sensor:', error);
        throw new Error('Error fetching reports by sensor');
      }
    }
    
    const fetchRoomDevices  = async (room) => {
      console.log('RoomId:', room);
      try {
        const response = await fetch(`http://localhost:8080/api/room-devices/${room}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Room devices N:', data);
        setNumberOfDevices(data); // Isso retornará o número de dispositivos associados ao roomId
      } catch (error) {
        console.error('Error fetching room devices:', error);
        throw new Error('Error fetching room devices');
      }
    }

  
  
    const fetchReportBySensor = async (sensorId) => {
      console.log('sensorId:', sensorId);
      try {
        const response = await fetch(`http://localhost:8080/sensorsafe/reports_sensors/reports/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + sessionStorage.getItem('Token:'),
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }


        const data = await response.json();

        const sensorValue = [];
        const date = [];
        const sensorType = [];
        const notifications = [];
        for (let i = 0; i < data.length; i++) {
          const report_data = data[i];
          if(report_data.type === 'DEVICES' && report_data.description.includes(sensorId)){

              const formattedValue = parseFloat(report_data.sensorValue).toFixed(2);
              date.push([(report_data.date), parseFloat(formattedValue)]);
              // date.push(report_data.date);
              sensorType.push(report_data.sensorType);
              notifications.push(report_data.description);
              
            }
            else{
              console.log("Sensor não encontrado");
            }
          }
        
          setsensorValue(sensorValue);
          setDate(date);
          // quero apenas os primerios 10notificaçoes
          notifications.reverse();
          setNotifications(notifications);
          console.log("Date****************: ", date);
        
        
         // Isso retornará o número de dispositivos associados ao roomId
      } catch (error) {
        console.error('Error fetching reports by sensor:', error);
        throw new Error('Error fetching reports by sensor');
      }
    }
    
    const [chartData, setChartData] = useState({
      series: [{
        name: "name",
        data: date
      }],
      options: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 350,
          zoom: {
            autoScaleYaxis: true,
            autoScaleXaxis: true
          }
        },
        annotations: {
          yaxis: [{
            y: 30,
            borderColor: '#999',
            label: {
              show: false,
              text: 'Support',
              style: {
                color: "#fff",
                background: '#00E396'
              }
            }
          }],
          xaxis: [{
            x: new Date().getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: false,
             
            }
          }]
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',

        },
        xaxis: {
          type: 'datetime',
          min: new Date().getTime(),
          tickAmount: 6,
          title: {
            text: 'Time', // Legend for X-axis
            style: {
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif',
              color: 'blue'
            }
          },
        },
        yaxis: {
          title: {

          },
          labels: {
            formatter: function (value) {
              return value.toFixed(2);
            }
          }
        },
        
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
      },
    
    
      selection: 'last 10 days',    
    });
  
  

    useEffect(() => {
    setChartData({
      series: [{
        name: "name",
        data: date
      }],
      options: {

        
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        dataLabels: {
          enabled: false
        },
        
      },

      selection: 'last_hour',

            
    });
  }, [sensorValue]);
  
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  // Dummy data for reports (replace with actual reports data)
  const [reports, setReports] = useState([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);


  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:9999/sensorsafe/pdfs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'palavra_passe_ultra_secreta',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const pdf = [];
      for (let i = 0; i < data.length; i++) {
        const report_data = data[i];
        if( report_data.roomID === selectedRoom ){
          pdf.push(report_data);
        }
      }
      setReports(pdf);
     
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoadingReports(false);
    }
  };
  

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
          roomID: selectedRoom,
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

  console.log("Reports: ", reports);
  useEffect(() => {
    fetchReports();
  },[selectedRoom]);
    
  function stringToBase64(str) {
    const encodedData = btoa(str);
    return encodedData;
}

function downloadPDF(pdfData, filename) {
    try {
        // Convertendo a string para Base64
        const base64Data = stringToBase64(pdfData);

        // Convertendo a string Base64 para Blob
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: 'application/pdf' });

        // Criando um URL para o Blob
        const url = URL.createObjectURL(blob);

        // Criando um elemento de link para download
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;

        // Adicionando o elemento de link ao corpo da página
        document.body.appendChild(a);

        // Acionando o clique no elemento de link para iniciar o download
        a.click();

        // Removendo o elemento de link após o download
        document.body.removeChild(a);
    } catch (error) {
        console.error("Erro ao decodificar ou criar o Blob:", error);
    }
}

  return (
    <div className="dashboard-container">
      <h2 className='dash-title'>Dashboard</h2>
      <div className="Reports"> 
        <nav id="nav10">
          <ul className="nav-links-Reports">
            <li id="RoomsRep" className={selectedItem === 'rooms' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('rooms')}>Rooms</Link>
            </li>
            <li id="DevicesRep" className={selectedItem === 'devices' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('devices')}>Sensors</Link>
            </li>
            <li id="Notifications" className={selectedItem === 'notifications' ? 'active' : ''}>
              <Link onClick={() => handleItemClick('notifications')}>
                Notifications <NotificationsOutlinedIcon /> 
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {selectedItem === 'rooms' ? (
            <>
              <h3 className='selRom'>Select Room</h3>
              <div className="room-options">
              {rooms.map((room) => (
                <span
                  className={`room-option ${selectedRoom === room.roomId ? 'active' : ''}`}
                  onClick={() => handleRoomSelection(room.roomId)}
                >
                  {room.roomName}
                </span>
              ))}
              </div>

              <div className="device-info-container">
                <h3 className="device-title">Sensors Information</h3>
                <div className="device-info-content">
                  {/* Number of devices */}
                  <p className='num_devices'> <CameraOutlinedIcon /> {numberOfDevices} Sensors</p>
                </div>
              </div>

              <h3 className='typesen'>Type Sensor</h3>
              
              <div className="room-options">
                {RoomType.map((room) => (
                  <span
                    className={`type-option ${room === selectedType ? 'active' : ''}`}
                    onClick={() => handleRoomType(room)}
                  >
                    {room}
                  </span>
                ))}
                </div>

              <div className='container-graph'>
                  <h3 id='graficozee'>Graphic Section</h3>
                  <div id="chart">

                  <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={600} />

                  </div>
              </div>

              {/* Toggle Sections */}
              <div className="toggle-buttons">
                <button id="hideRep" onClick={toggleReports} data-action={showReports ? 'Hide' : 'Show'}>
                  {showReports ? 'Hide Reports' : 'Show Reports'}
                </button>
                <button id="hideNot" onClick={toggleNotifications} data-action={showNotifications ? 'Hide' : 'Show'}>
                  {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
                </button>
              </div>

              

              
              {/* Sections Side by Side */}
              <div className="sections-container">
                {/* Reports Section */}
                {showReports ? (<>
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
      {/* Show the history of reports */}
      <div>
        <h3>Report History</h3>
        {isLoadingReports ? (
          <p>Loading reports...</p>
        ) : (
         
<ul>
  {reports.map((report, index) => (
    <li key={index}>
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault(); // Evita a navegação padrão.
          const base64String = report.reportData.report_data;
          const filename = `Report_${report.roomID}.pdf`;
          downloadPDF(base64String, filename);
        }}
      >
        Report {index + 1} - {report.roomID}
      </a>
    </li>
  ))}
</ul>

        )}
      </div>    
    </div>
                
                </>) : null}

                {/* Notifications Section */}
                {showNotifications && 
              // chama o notification section ele vai receber o array de notificações
              <NotificationsSection notifications={NotificationsRoom} />
              }
              </div>
            </>
          ) : selectedItem === 'devices' ? (
            <>
              <h3 className='selDev'>Select Device</h3>
              <div className="room-options">
              {sensors.map((sensor) => (
                <span
                  className={`type-option ${selectedSensor === sensor.deviceId ? 'active' : ''}`}
                  onClick={() => handleSensorSelection(sensor.deviceId)}
                >
                  {sensor.name}
                </span>
              ))}
              </div>
              <div className='container-graph'>
                  <h3>Graphic Section</h3>
                  <div id="chart">

                    <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={650} />

                  </div>


              </div>

            {/* Toggle Sections */}
            <div className="toggle-buttons">
              {/* <button id="hideRep" onClick={toggleReports} data-action={showReports ? 'Hide' : 'Show'}>
                {showReports ? 'Hide Reports' : 'Show Reports'}
              </button> */}
              <button id="hideNot" onClick={toggleNotifications} data-action={showNotifications ? 'Hide' : 'Show'}>
                {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
              </button>
            </div>


            {/* Sections Side by Side */}
            <div className="sections-container">
              {/* Reports Section */}
              {/* {showReports && <ReportsSection roomid={selectedRoom} />} */}

              {/* Notifications Section */}
              {showNotifications && 
              <NotificationsSection notifications={notifications} />
              }


            </div>
            </>
          ) : selectedItem === 'notifications' ? (
            <>
              <h3 className='realTime'>Real Time Notifications</h3>
              <div style={{ height: "50%", width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <List sx={{ width: '80%', }} component="nav" aria-label="mailbox folders">

                    <Divider />
                    {array_notif.map((notif) => (
                      <ListItem button>
                        <ListItemText primary={notif} />
                        <Divider />
                      </ListItem>

                  ))}
                </List>
              </div>
            </>
            
            
          ) : (null)}
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

export default Dashboard;
