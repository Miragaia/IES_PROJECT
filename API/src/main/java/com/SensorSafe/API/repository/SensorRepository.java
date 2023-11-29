package com.SensorSafe.API.repository;

import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.device.Sensor;

public interface SensorRepository extends MongoRepository<Sensor, Long>{
    
    Sensor findBySensorId(ObjectId sensorId);
    boolean existsBySensorId(ObjectId sensorId);
    void deleteBySensorId(ObjectId sensorId);
}
