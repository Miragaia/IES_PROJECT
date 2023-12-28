package com.SensorSafe.API.model.device;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "accessibleDevices")
@Data
@ToString(callSuper = true)
public class AvailableDevice extends AbstractDevice {
    private String userDeviceName;

    public AvailableDevice(ObjectId deviceId, String name, DeviceCategory category, String userDeviceName) {
        super(deviceId, name, category);
        this.userDeviceName = userDeviceName;
    }

}
