package com.SensorSafe.API.services;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.SensorSafe.API.model.device.AvailableDevice;
import com.SensorSafe.API.repository.AvailableDeviceRepository;
import java.util.List;
import com.SensorSafe.API.exceptions.UserNotFoundException;

@Service
public class AvailableDeviceService {
    
    private final AvailableDeviceRepository availableDeviceRepository;

    @Autowired
    public AvailableDeviceService(AvailableDeviceRepository availableDeviceRepository){
        this.availableDeviceRepository = availableDeviceRepository;
    }

    public void registerAvailableDevice(AvailableDevice availableDevice){
        availableDeviceRepository.save(availableDevice);
    }

    public List<AvailableDevice> getAllAvailableDevices(){
        return availableDeviceRepository.findAll();
    }

    public List<AvailableDevice> getAllAvailableDevicesByUsername(String userDeviceName){
        return availableDeviceRepository.findByUserDeviceName(userDeviceName);
    }


    public AvailableDevice getAvailableDeviceById(ObjectId id){
        return availableDeviceRepository.findByDeviceId(id);
    }

    public boolean availableDeviceExists(ObjectId id){
        return availableDeviceRepository.existsByDeviceId(id);
    }

    public void deleteAvailableDeviceById(ObjectId id){
        
        if (availableDeviceExists(id)){
            availableDeviceRepository.deleteByDeviceId(id);
        }
        else{
            throw new UserNotFoundException("Invalid device data with id: " + id + " - invalid device");
        }
    }

    public void updateAvailableDevice(AvailableDevice availableDevice){
        availableDeviceRepository.deleteByDeviceId(availableDevice.getDeviceId());
        availableDeviceRepository.save(availableDevice);
    }
}
