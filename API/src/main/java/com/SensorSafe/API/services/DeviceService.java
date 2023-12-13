package com.SensorSafe.API.services;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SensorSafe.API.auth.AuthHandler;
import com.SensorSafe.API.model.device.AvailableDevice;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.model.room.Room;
import com.SensorSafe.API.repository.DevicesRepository;

@Service
public class DeviceService {
    
    private final DevicesRepository devicesRepository;
    private final RoomService roomService;
    private final AvailableDeviceService availableDeviceService;
    private final AuthHandler authHandler;

    @Autowired
    public DeviceService(DevicesRepository devicesRepository, RoomService roomService, AvailableDeviceService availableDeviceService, AuthHandler authHandler){
        this.devicesRepository = devicesRepository;
        this.roomService = roomService;
        this.availableDeviceService = availableDeviceService;
        this.authHandler = authHandler;
    }

    public Device registerDevice(Device device){

        device.setDeviceId(new ObjectId());

        if (roomService.exists(device.getRoomID())){
            Room room = roomService.getRoom(device.getRoomID());
            room.getDevices().add(device);
            roomService.updateRoom(room);
        }
        else{
           
            device.setRoomID(null);

            AvailableDevice availableDevice = new AvailableDevice(device.getDeviceId(),device.getName(),device.getCategory(), authHandler.getUsername());
            availableDeviceService.registerAvailableDevice(availableDevice);
        }


        return devicesRepository.save(device);
    }

    public Device getDeviceById(ObjectId id){
        return devicesRepository.findByDeviceId(id);
    }

    public List<Device> getAllDevices(){
        return devicesRepository.findAll();
    }

    public void deleteByDeviceId(ObjectId id){
        devicesRepository.deleteByDeviceId(id);
    }

    public void updateDevice(Device device){
        devicesRepository.deleteByDeviceId(device.getDeviceId());
        devicesRepository.save(device);
    }
}
