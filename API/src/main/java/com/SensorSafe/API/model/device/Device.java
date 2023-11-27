package com.SensorSafe.API.model.device;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "devices")
@Data
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Device extends AbstratctDevice{
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId roomID;

    public Device(ObjectId deviceId, String name, DeviceCategory category, ObjectId roomID) {
        super(deviceId, name, category);
        this.roomID = roomID;
    }
}
