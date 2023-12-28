package com.SensorSafe.API.repository;


import org.springframework.stereotype.Repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.report.ReportSensorItem;


    public interface SensorReportRepository extends MongoRepository<ReportSensorItem, Long>
    {
        List<ReportSensorItem> findBySensorId(ObjectId sensorId);
        ReportSensorItem findByReportId(ObjectId reportId);
    }    

