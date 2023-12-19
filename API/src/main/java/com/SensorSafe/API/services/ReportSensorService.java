package com.SensorSafe.API.services;

import org.springframework.stereotype.Service;

import java.util.List;

import org.bson.types.ObjectId;
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

    public void save(ReportSensorItem reportSensor){
        System.out.println("Registering Report Sensor");
        System.out.println(reportSensor);
        try{
            sensorReportRepository.save(reportSensor);
            System.out.println("Report Sensor saved");
        }catch(Exception e){
            System.out.println("Error saving report sensor");
            System.out.println(e);
        }
    }

    public List<ReportSensorItem> getAllReportSensors(){
        return sensorReportRepository.findAll();
    }

    public List<ReportSensorItem> getReportSensorBySensorId(ObjectId sensorId){
        return sensorReportRepository.findBySensorId(sensorId);
    }
    
    public ReportSensorItem getReportSensorByReportId(ObjectId reportId){
        return sensorReportRepository.findByReportId(reportId);
    }

    public List<ReportSensorItem> getAllReportSensorItem() {
        return null;
    }


}
