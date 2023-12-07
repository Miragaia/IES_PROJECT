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

    // public void updateRoomStats(ObjectId roomId) {
    //     Room room = roomService.getRoomById(roomId);
    //     RoomStats roomStats = room.getRoomStats();
    //     roomStats.setTemperature(getRoomTemperature(roomId));
    //     roomStats.setHumidity(getRoomHumidity(roomId));
    //     roomStats.setLight(getRoomLight(roomId));
    //     roomStats.setAirQuality(getRoomAirQuality(roomId));
    //     roomService.updateRoom(room);
    // }

    // public double getRoomTemperature(ObjectId roomId) {
    //     double temperature = 0;
    //     int count = 0;
    //     for (Device device : sensorService.getSensorsByRoomId(roomId)) {
    //         if (device.getCategory() == DeviceCategory.TEMPERATURE_SENSOR) {
    //             temperature += ((Sensor) device).getValue();
    //             count++;
    //         }
    //     }
    //     return temperature / count;
    // }

    // public double getRoomHumidity(ObjectId roomId) {
    //     double humidity = 0;
    //     int count = 0;
    //     for (Device device : sensorService.getSensorsByRoomId(roomId)) {
    //         if (device.getCategory() == DeviceCategory.HUMIDITY_SENSOR) {
    //             humidity += ((Sensor) device).getValue();
    //             count++;
    //         }
    //     }
    //     return humidity / count;
    // }

    // public double getRoomLight(ObjectId roomId) {
    //     double light = 0;
    //     int count = 0;
    //     for (Device device : sensorService.getSensorsByRoomId(roomId)) {
    //         if (device.getCategory() == DeviceCategory.LIGHT_SENSOR) {
    //             light += ((Sensor) device).getValue();
    //             count++;
    //         }
    //     }
    //     return light / count;
    // }

    // public double getRoomAirQuality(ObjectId roomId) {
    //     double airQuality = 0;
    //     int count = 0;
    //     for (Device device : sensorService.getSensorsByRoomId(roomId)) {
    //         if (device.getCategory() == DeviceCategory.AIR_QUALITY_SENSOR) {
    //             airQuality += ((Sensor) device).getValue();
    //             count++;
    //         }
    //     }
    //     return airQuality / count;
    // }
    
}
