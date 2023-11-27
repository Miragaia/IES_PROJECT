package com.SensorSafe.API.model.device;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "devices")
@Data
@ToString(callSuper = true)
public class Sensor extends Device {
    private String state;

    public Sensor(ObjectId deviceId, String name, DeviceCategory category, ObjectId roomID, String state) {
        super(deviceId, name, category, roomID);
        this.state = state;
    }
    
}
