package com.SensorSafe.API.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SensorSafe.API.exceptions.RoomNotFoundException;
import com.SensorSafe.API.exceptions.UserNotFoundException;
import com.SensorSafe.API.model.room.Room;
import com.SensorSafe.API.repository.RoomRepository;
import com.SensorSafe.API.model.room.RoomStats;


import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    public Room RegisteRoom(Room room){
        
        if (!room.isValid())
            throw new UserNotFoundException("Invalid room data - invalid room");

        if (room.getDevices() == null)
            room.setDevices(new ArrayList<>());
        
        if (room.getUsers() == null)        
            room.setUsers(new ArrayList<>());
    
        roomRepository.save(room);    

        return roomRepository.findByRoomId(room.getRoomId());
    }

    public Room getRoom(ObjectId roomId) {
        return roomRepository.findByRoomId(roomId);
    }
        
    public List<Room> getRoomsByUser(String username){
        return roomRepository.findRoomByUsers(username);
    }
    public List<Room> getAllRooms(){
        return roomRepository.findAll();
    }
    
    public boolean exists(ObjectId roomId){
        return roomRepository.existsByRoomId(roomId);
    }

    public boolean exists(String roomName){
        return roomRepository.existsByRoomName(roomName);
    }

    public void deleteRoom(Room roomId){
        roomRepository.deleteByRoomId(roomId.getRoomId());
    }

    public void saveRoom(Room room){
        roomRepository.save(room);
    }

    public void updateRoom(Room room){
        roomRepository.deleteByRoomId(room.getRoomId());
        roomRepository.save(room);
    }

    public boolean roomIsAutomatized(ObjectId roomId){
        if (!roomRepository.existsByRoomId(roomId))
            throw new RoomNotFoundException("Room not found - invalid room ID");
        
        return roomRepository.existsByRoomIdAndAutomatized(roomId);
    }

    public RoomStats getRoomStatistics(ObjectId roomId){
        if (!roomRepository.existsByRoomId(roomId))
            throw new RoomNotFoundException("Room not found - invalid room ID");
        
        Room room = roomRepository.findByRoomId(roomId);

        //ver resto do Trigo

        return roomRepository.getStatsByRoomId(roomId);
    }

}
