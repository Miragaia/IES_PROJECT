package com.SensorSafe.API.model.report;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Date;

@Document(collection = "reports")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Report {


    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId reportId;
    private String name;
    private ReportType type;
    private Date date;
    private String description;
    
}
