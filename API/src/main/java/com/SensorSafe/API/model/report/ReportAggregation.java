package com.SensorSafe.API.model.report;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;


@Data
@AllArgsConstructor
public class ReportAggregation {
    
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId sensorId;
    private String sensorType;
    private String sensorStatus;
}
