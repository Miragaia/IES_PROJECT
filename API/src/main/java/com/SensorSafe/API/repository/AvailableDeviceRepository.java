package com.SensorSafe.API.repository;

import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.model.device.AvailableDevice;


public interface AvailableDeviceRepository extends MongoRepository<AvailableDevice, Long>{
    AvailableDevice findByDeviceId(ObjectId deviceId);
    boolean existsByDeviceId(ObjectId deviceId);
    void deleteByDeviceId(ObjectId deviceId);
}
