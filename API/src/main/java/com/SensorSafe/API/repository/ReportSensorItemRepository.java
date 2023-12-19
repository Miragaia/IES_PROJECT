package com.SensorSafe.API.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.report.ReportSensorItem;

public interface ReportSensorItemRepository extends MongoRepository<ReportSensorItem, Long>{
        
        ReportSensorItem findByReportId(ObjectId reportId);
        boolean existsByReportId(ObjectId reportId);
        void deleteByReportId(ObjectId reportId);
    
}
