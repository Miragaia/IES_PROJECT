package com.SensorSafe.API.services;

import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.SensorSafe.API.model.report.ReportSensorItem;
import com.SensorSafe.API.repository.SensorReportRepository;

@Service
public class ReportSensorService {
    
    private final SensorReportRepository sensorReportRepository;

    @Autowired
    public ReportSensorService(SensorReportRepository sensorReportRepository){
        this.sensorReportRepository = sensorReportRepository;
    }

    public void registerReportSensor(ReportSensorItem reportSensor){
        sensorReportRepository.save(reportSensor);
    }

    public List<ReportSensorItem> getAllReportSensors(){
        return sensorReportRepository.findAll();
    }

}
