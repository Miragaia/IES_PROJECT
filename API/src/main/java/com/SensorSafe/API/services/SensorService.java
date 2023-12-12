package com.SensorSafe.API.services;

import java.util.List;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import com.SensorSafe.API.model.room.Room;
import com.SensorSafe.API.auth.AuthHandler;
import com.SensorSafe.API.exceptions.UserNotFoundException;
import com.SensorSafe.API.model.device.AvailableDevice;
import com.SensorSafe.API.model.device.Sensor;
import com.SensorSafe.API.repository.SensorRepository;

@Service
public class SensorService {

    private final SensorRepository sensorRepository;
    private final RoomService roomService;
    private final AvailableDeviceService availableDeviceService;
    private final AuthHandler authHandler;


    @Autowired
    public SensorService(SensorRepository sensorRepository, RoomService roomService, AvailableDeviceService availableDeviceService, AuthHandler authHandler){
        this.sensorRepository = sensorRepository;
        this.roomService = roomService;
        this.availableDeviceService = availableDeviceService;
        this.authHandler = authHandler;
    }
    
    public void registerSensor(Sensor sensor){
        sensor.setDeviceId(new ObjectId());

        if (sensor.getRoomID() == null){

            if (roomService.exists(sensor.getRoomID())){
                Room room = roomService.getRoom(sensor.getRoomID());
                room.getDevices().add(sensor);
                roomService.updateRoom(room);
            }
            else{
                // adiciona aos dispositivos disponiveis
                sensor.setRoomID(null);
                // transforma o sensor em availbel device
                AvailableDevice availableDevice = new AvailableDevice(sensor.getDeviceId(),sensor.getName(),sensor.getCategory(), authHandler.getUsername());
                availableDeviceService.registerAvailableDevice(availableDevice);
                
            }
        }

        sensorRepository.save(sensor);
    }

    public Sensor getSensorById(ObjectId sensorId){
        return sensorRepository.findByDeviceId(sensorId);
    }

    public List<Sensor> getAllSensors(){
        return sensorRepository.findAll();
    }

    public boolean sensorExists(ObjectId sensorId){
        return sensorRepository.existsByDeviceId(sensorId);
    }

    public void deleteSensor(Sensor sensorId){
        sensorRepository.deleteByDeviceId(sensorId.getDeviceId());
    }

    public void saveSensor(Sensor sensor){
        sensorRepository.save(sensor);
    }

    public void updateSensor(Sensor sensor){
        deleteSensor(sensor);
        saveSensor(sensor);
    }
}
