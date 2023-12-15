package com.SensorSafe.API.model.room;

import com.fasterxml.jackson.annotation.JsonCreator;
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


@Document(collection = "rooms")
@Data
@AllArgsConstructor

public class Room {

    @JsonCreator
    public Room() {
    }

    @Id
    @Field(value = "_id")
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId roomId;
    private String roomName;
    private List<String> users;
    private List<Device> devices;
    private RoomAutomation automatized;
    private RoomStats stats;

    public boolean isValid() {
        return roomName != null;
    }

}