package com.SensorSafe.API.model.room;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.SensorSafe.API.model.device.Device;

import javax.persistence.Id;
import java.util.List;

@Data
@AllArgsConstructor
@Document(collection = "rooms")
public class Room {

    @Id
    @Field(value = "_id")
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId roomId;
    private String roomName;
    private List<String> users;
    private List<Device> devices;
    private RoomStats stats;

    public boolean isValid() {
        return roomName != null;
    }

}