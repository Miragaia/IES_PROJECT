package com.SensorSafe.API.model.report;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

import java.util.Date;


@EqualsAndHashCode(callSuper = true)
@Document(collection = "reports")
@Data
@ToString(callSuper = true)
public class ReportSensorItem extends Report {
    
    private ObjectId sensorId;
    private String sensorType;
    private String sensorStatus;
    private double sensorValue;

    public ReportSensorItem(ObjectId reportId, String name, ReportType type, Date date, String description, ObjectId sensorId, String sensorType, String sensorStatus, double sensorValue) {
        super(reportId, name, type, date, description);
        this.sensorId = sensorId;
        this.sensorType = sensorType;
        this.sensorStatus = sensorStatus;
        this.sensorValue = sensorValue;
    }
}
