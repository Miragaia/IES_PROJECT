package com.SensorSafe.API.midleware;


import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.SensorSafe.API.model.room.Room;
import com.SensorSafe.API.model.room.RoomStats;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.model.device.DeviceCategory;
import com.SensorSafe.API.model.device.Sensor;
import com.SensorSafe.API.model.report.ReportType;
import com.SensorSafe.API.services.RoomService;
import com.SensorSafe.API.services.SensorService;
import com.SensorSafe.API.services.ReportService;
import com.SensorSafe.API.model.report.Report;
import com.SensorSafe.API.model.report.ReportType;
import org.bson.types.ObjectId;

@Component  
public class MiddlewareHandler {

    private final RoomService roomService;
    private final SensorService sensorService;
    private final ReportService reportService;

    @Autowired
    public MiddlewareHandler(RoomService roomService, SensorService sensorService, ReportService reportService) {
        this.roomService = roomService;
        this.sensorService = sensorService;
        this.reportService = reportService;
    }

    public RoomStats calculateRoomStats(ObjectId roomId){
        double temperature = 0;
        double humidity = 0;
        double smoke = 0;

        int tempSensors, humSensors, smokeSensors;

        if (!roomService.exists(roomId)){
            return null;
        }

        Room room = roomService.getRoom(roomId);

        for (Device device : room.getDevices()){
            if (device == null){
                continue;
            }

            if (!sensorService.sensorExists(device.getDeviceId())){
                continue;
            }

            Sensor sensor = sensorService.getSensorById(device.getDeviceId());

            if (sensor == null){
                continue;
            }

            if (sensor.isSensorStatus() == false){
                continue;
            }

            switch (sensor.getCategory()) {
                case TEMPERATURE:
                    temperature += sensor.getValue();
                    break;
                case HUMIDITY:
                    humidity += sensor.getValue();
                    break;
                case SMOKE:
                    smoke += sensor.getValue();
                    break;
                case OTHERS:
                    break;
                }
            }
            tempSensors = (int) room.getDevices().stream().filter(d -> d.getCategory() == DeviceCategory.TEMPERATURE).count();
            humSensors = (int) room.getDevices().stream().filter(d -> d.getCategory() == DeviceCategory.HUMIDITY).count();
            smokeSensors = (int) room.getDevices().stream().filter(d -> d.getCategory() == DeviceCategory.SMOKE).count();

            double roomTemperature = tempSensors > 0 ? temperature / tempSensors : temperature;
            double roomHumidity = humSensors > 0 ? humidity / humSensors : humidity;
            double roomSmoke = smokeSensors > 0 ? smoke / smokeSensors : smoke;

            RoomStats roomStats = new RoomStats(roomTemperature, roomHumidity, roomSmoke);

            room.setStats(roomStats);
            roomService.updateRoom(room);

            
        return roomStats;
        

    }

    public void calculateRoomAutomation(ObjectId roomId, ObjectId sensorId){
        Room room = roomService.getRoom(roomId);
        Sensor sensor = sensorService.getSensorById(sensorId);

        if (sensor == null){
            System.out.println("Sensor not found");
        }

        if (room == null){
            System.out.println("Room not found");
        }

        boolean automationTemperature = room.getAutomatized().isAutomatizedHumidity();
        boolean automationHumidity = room.getAutomatized().isAutomatizedHumidity();
        boolean automationSmoke = room.getAutomatized().isAutomatizedSmoke();
        double maxValueAutomation = 0.0;
        double minValueAutomation = 0.0;

        if (automationTemperature){
            if (sensor.getCategory() == DeviceCategory.TEMPERATURE){
                maxValueAutomation = room.getAutomatized().getMaxTemperature();
                minValueAutomation = room.getAutomatized().getMinTemperature();
                
                if (sensor.getValue() > maxValueAutomation){
                    System.out.println("Temperature is too high - " + sensor.getValue());
                    Report report = new Report(null, sensor.getName(), ReportType.ROOMS, new Date(), "Temperature is above of the maximum automation value:" + maxValueAutomation + ", current value: " + sensor.getValue()+ " in room: " + room.getRoomName() + " initializing automation");
                    reportService.saveReport(report);  
                } 
                if (sensor.getValue() < minValueAutomation){
                    System.out.println("Temperature is too low - " + sensor.getValue());
                    Report report = new Report(null, sensor.getName(), ReportType.ROOMS, new Date(), "Temperature is below of the minimum automation value:" + minValueAutomation + ", current value: " + sensor.getValue()+ " in room: " + room.getRoomName() + " initializing automation");
                    reportService.saveReport(report);                      
                }
            }
        }
        if (automationHumidity){
            if (sensor.getCategory() == DeviceCategory.HUMIDITY){
                maxValueAutomation = room.getAutomatized().getMaxHumidity();
                minValueAutomation = room.getAutomatized().getMinHumidity();

                if (sensor.getValue() > maxValueAutomation){
                    System.out.println("Humidity is too high - " + sensor.getValue());
                    Report report = new Report(null, sensor.getName(), ReportType.ROOMS, new Date(), "Humidity is above of the maximum automation value:" + maxValueAutomation + ", current value: " + sensor.getValue()+ " in room: " + room.getRoomName() + " initializing automation");
                    reportService.saveReport(report);  
                }

                if (sensor.getValue() < minValueAutomation){
                    System.out.println("Humidity is too low - " + sensor.getValue());
                    Report report = new Report(null, sensor.getName(), ReportType.ROOMS, new Date(), "Humidity is below of the minimum automation value:" + minValueAutomation + ", current value: " + sensor.getValue()+ " in room: " + room.getRoomName() + " initializing automation");
                    reportService.saveReport(report);  
                }

            }
        }

        if (automationSmoke){
            if (sensor.getCategory() == DeviceCategory.SMOKE){
                maxValueAutomation = room.getAutomatized().getMaxSmoke();
                
                if (sensor.getValue() > maxValueAutomation){
                    System.out.println("Smoke is too high - " + sensor.getValue());
                    Report report = new Report(null, sensor.getName(), ReportType.ROOMS, new Date(), "Smoke is above of the maximum automation value:" + maxValueAutomation + ", current value: " + sensor.getValue()+ " in room: " + room.getRoomName() + " initializing automation");
                    reportService.saveReport(report);  
                }
                
            }
        }

        return;
    }
}
