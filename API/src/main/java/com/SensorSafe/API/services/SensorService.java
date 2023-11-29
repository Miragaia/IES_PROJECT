package com.SensorSafe.API.services;

import java.util.List;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import com.SensorSafe.API.model.room.Room;
import com.SensorSafe.API.exceptions.UserNotFoundException;
import com.SensorSafe.API.model.device.Sensor;
import com.SensorSafe.API.repository.SensorRepository;

@Service
public class SensorService {

    private final SensorRepository sensorRepository;
    private final RoomService roomService;

    @Autowired
    public SensorService(SensorRepository sensorRepository, RoomService roomService){
        this.sensorRepository = sensorRepository;
        this.roomService = roomService;
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
                throw new UserNotFoundException("Invalid room data - invalid room");
            }
        }

        sensorRepository.save(sensor);
    }

    public Sensor getSensorById(ObjectId sensorId){
        return sensorRepository.findBySensorId(sensorId);
    }

    public List<Sensor> getAllSensors(){
        return sensorRepository.findAll();
    }

    public boolean sensorExists(ObjectId sensorId){
        return sensorRepository.existsBySensorId(sensorId);
    }

    public void deleteSensor(Sensor sensorId){
        sensorRepository.deleteBySensorId(sensorId.getDeviceId());
    }

    public void saveSensor(Sensor sensor){
        sensorRepository.save(sensor);
    }

    public void updateSensor(Sensor sensor){
        deleteSensor(sensor);
        saveSensor(sensor);
    }
}
