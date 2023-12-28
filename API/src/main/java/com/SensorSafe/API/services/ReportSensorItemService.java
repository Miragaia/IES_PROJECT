package com.SensorSafe.API.services;

import java.util.List;

import com.SensorSafe.API.model.device.Sensor;
import com.SensorSafe.API.repository.ReportSensorItemRepository;
import com.SensorSafe.API.repository.SensorRepository;
import com.SensorSafe.API.model.report.ReportSensorItem;

public class ReportSensorItemService {
    private final ReportSensorItemRepository reportSensorItemRepository;

    public ReportSensorItemService(ReportSensorItemRepository reportSensorItemRepository){
        this.reportSensorItemRepository = reportSensorItemRepository;
    }

    public List<ReportSensorItem> getAllReportSensorItem(){
        return reportSensorItemRepository.findAll();
    }
    
}
