package com.SensorSafe.API.services;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.repository.DevicesRepository;

@Service
public class DeviceService {
    
    private final DevicesRepository devicesRepository;

    @Autowired
    public DeviceService(DevicesRepository devicesRepository){
        this.devicesRepository = devicesRepository;
    }

    public Device registerDevice(Device device){
        return devicesRepository.save(device);
    }

    public Device getDeviceById(ObjectId id){
        return devicesRepository.findByDeviceId(id);
    }

    public List<Device> getAllDevices(){
        return devicesRepository.findAll();
    }

    public void deletDevicebyId(ObjectId id){
        devicesRepository.deleteByDeviceId(id);
    }

    public void updateDevice(Device device){
        devicesRepository.deleteByDeviceId(device.getDeviceId());
        devicesRepository.save(device);
    }
}
