package com.SensorSafe.API.model.sensor_events;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "sensor_events")
public class SensorEvents {

    @Id
    @JsonSerialize(using=ToStringSerializer.class)
    private ObjectId id;

    @JsonSerialize(using=ToStringSerializer.class)
    private ObjectId sensorId;

    @JsonSerialize(using=ToStringSerializer.class)
    private ObjectId targetId;

    private ActionType actionType;
    private Trigger trigger;

    

}

