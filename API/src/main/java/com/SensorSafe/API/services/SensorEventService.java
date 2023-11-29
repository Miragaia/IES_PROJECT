package com.SensorSafe.API.services;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import com.SensorSafe.API.model.sensor_events.SensorEvents;
import com.SensorSafe.API.repository.SensorEventRepository;

import java.util.List;

@Service
public class SensorEventService {

    private final SensorEventRepository sensorEventRepository;
    
    @Autowired
    public SensorEventService(SensorEventRepository sensorEventRepository){
        this.sensorEventRepository = sensorEventRepository;
    }

    public void registerSensorEvent(SensorEvents sensorEvent){
        sensorEventRepository.save(sensorEvent);
    }

    public List<SensorEvents> getAllSensorEvents(){
        return sensorEventRepository.findAll();
    }
}
