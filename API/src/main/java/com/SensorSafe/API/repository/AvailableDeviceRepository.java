package com.SensorSafe.API.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.model.device.AvailableDevice;


public interface AvailableDeviceRepository extends MongoRepository<AvailableDevice, Long>{
    AvailableDevice findByDeviceId(ObjectId deviceId);
    List<AvailableDevice> findByUserDeviceName(String userDeviceName);
    boolean existsByDeviceId(ObjectId deviceId);
    void deleteByDeviceId(ObjectId deviceId);
}
