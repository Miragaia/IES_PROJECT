package com.SensorSafe.API.model.device;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "devices")
@Data
@ToString(callSuper = true)
@NoArgsConstructor
public class Sensor extends Device {
    private boolean sensorStatus;
    private double value;

    public Sensor(ObjectId deviceId, String name, DeviceCategory category, ObjectId roomID, boolean sensorStatus, double value) {
        super(deviceId, name, category, roomID);
        this.sensorStatus = sensorStatus;
        this.value = value;
    }
}
