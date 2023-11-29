package com.SensorSafe.API.services;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import com.SensorSafe.API.model.report.ReportType;
import com.SensorSafe.API.model.report.ReportSensorItem;
import com.SensorSafe.API.repository.ReportRepository;

@Service
public class ReportService {
    
    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository){
        this.reportRepository = reportRepository;
    }

    public ReportSensorItem saveReport(ReportSensorItem report){
        return reportRepository.save(report);
    }

    public List<ReportSensorItem> getAllReports(){
        return reportRepository.findAll();
    }

    public List<ReportSensorItem> getReportsByType(ReportType type){
        return reportRepository.findByType(type);
    }

    public List<ReportSensorItem> getReportsBySensorId(ObjectId sensorId){
        return reportRepository.findBySensorId(sensorId);
    }
}
