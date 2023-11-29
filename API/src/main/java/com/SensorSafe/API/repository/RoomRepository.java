package com.SensorSafe.API.repository;

import org.springframework.stereotype.Repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.room.Room;

public interface RoomRepository extends MongoRepository<Room, Long>{
    Room findByRoomId(ObjectId roomId);
    Room findByRoomName(String roomName);

    boolean existsByRoomId(ObjectId roomId);
    boolean existsByRoomName(String roomName);
    
    void deleteByRoomId(ObjectId roomId);
}
