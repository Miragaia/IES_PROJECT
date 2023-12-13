package com.SensorSafe.API.repository;

import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.sensor_events.SensorEvents;

public interface SensorEventRepository extends MongoRepository<SensorEvents, Long>{
    
}
