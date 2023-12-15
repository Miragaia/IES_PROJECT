package com.SensorSafe.API.midleware;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.SensorSafe.API.model.room.Room;
import com.SensorSafe.API.model.room.RoomStats;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.model.device.DeviceCategory;
import com.SensorSafe.API.model.device.Sensor;
import com.SensorSafe.API.services.RoomService;
import com.SensorSafe.API.services.SensorService;

@Component  
public class MiddlewareHandler {

    private final RoomService roomService;
    private final SensorService sensorService;

    @Autowired
    public MiddlewareHandler(RoomService roomService, SensorService sensorService) {
        this.roomService = roomService;
        this.sensorService = sensorService;
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
}
