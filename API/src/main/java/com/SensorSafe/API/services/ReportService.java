package com.SensorSafe.API.services;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import com.SensorSafe.API.model.report.ReportType;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.model.report.Report;
import com.SensorSafe.API.model.report.ReportSensorItem;
import com.SensorSafe.API.repository.ReportRepository;

@Service
public class ReportService {
    
    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository){
        this.reportRepository = reportRepository;
    }

    public Report saveReport(Report report){
        return reportRepository.save(report);
    }

    public List<Report> getAllReports(){
        return reportRepository.findAll();
    }

    public List<Report> getReportsByType(ReportType type){
        return reportRepository.findByType(type);
    }

    public Report getReportById(ObjectId id){
        return reportRepository.findByReportId(id);
    }
}
