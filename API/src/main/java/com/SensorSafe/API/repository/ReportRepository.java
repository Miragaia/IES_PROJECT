package com.SensorSafe.API.repository;


import org.springframework.stereotype.Repository;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.report.Report;
import com.SensorSafe.API.model.report.ReportType;
import com.SensorSafe.API.model.report.ReportSensorItem;

public interface ReportRepository extends MongoRepository<Report, Long> {

    List<Report> findByType(ReportType type);
    Report findByReportId(ObjectId id);
}
