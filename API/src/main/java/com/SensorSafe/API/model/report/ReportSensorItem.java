package com.SensorSafe.API.model.report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.NoArgsConstructor;
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

}
