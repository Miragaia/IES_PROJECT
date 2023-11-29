package com.SensorSafe.API.repository;

import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.device.Sensor;

public interface SensorRepository extends MongoRepository<Sensor, Long>{
    
    Sensor findByDeviceId(ObjectId deviceId);
    boolean existsByDeviceId(ObjectId deviceId);
    void deleteByDeviceId(ObjectId deviceId);
}
