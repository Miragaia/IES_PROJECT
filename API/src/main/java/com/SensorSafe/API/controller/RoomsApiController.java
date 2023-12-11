package com.SensorSafe.API.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.messaging.Message;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.SensorSafe.API.exceptions.UserNotFoundException;

import com.SensorSafe.API.tokens.JwtRequest;
import com.SensorSafe.API.tokens.JwtResponse;
import com.SensorSafe.API.tokens.JwtUserDetailsService;
import com.SensorSafe.API.tokens.JwtTokenUtil;

import com.SensorSafe.API.model.room.Room;
import com.SensorSafe.API.model.room.RoomStats;
import com.SensorSafe.API.repository.RoomRepository;
import com.SensorSafe.API.services.RoomService;
import com.SensorSafe.API.model.device.AvailableDevice;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.repository.DevicesRepository;
import com.SensorSafe.API.services.DeviceService;

import com.SensorSafe.API.services.AvailableDeviceService;




@RestController
@RequestMapping("/sensorsafe")
@Api(value = "Rooms API", description = "Operations pertaining to rooms", tags = "Rooms" )
public class RoomsApiController {

    private final RoomService roomService;

    @Autowired
    public RoomsApiController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("/rooms")
    @ApiOperation(value = "Create Room", notes = "Create a new room", response = Room.class)
    public Room createRoom(@RequestBody Room room) {
        if (roomService.exists(room.getRoomName()))
            throw new DuplicateKeyException("Room already exists - invalid room name");

        if (!room.isValid())
            throw new UserNotFoundException("Invalid room data - invalid room");

        if (room.getRoomId() == null)
            room.setRoomId(new ObjectId());

        if (room.getDevices() == null)
            room.setDevices(new ArrayList<>());

        if (room.getUsers() == null)        
            room.setUsers(new ArrayList<>());

        return roomService.RegisteRoom(room);
    }

    @GetMapping("/rooms")
    @ApiOperation(value = "Get All Rooms", notes = "Get a list of all rooms", response = Iterable.class)
    public Iterable<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @DeleteMapping("/rooms/{roomId}")
    @ApiOperation(value = "Delete Room", notes = "Delete a room by ID")
    public void deleteRoom(@PathVariable Room roomId) {  
        if (!roomService.exists(roomId.getRoomId()))
            throw new UserNotFoundException("Room not found - invalid room ID");
        
        Room room = roomService.getRoom(roomId.getRoomId());

        if (room.getDevices() != null)
            for (Device device : room.getDevices()) {
                // tornar o device available
                // DeviceService.deleteByDeviceId(device.getDeviceId());
                // AvailableDevice newAvailableDevice = new AvailableDevice(device.getDeviceId(), "Device " + device.getDeviceId(), device.getCategory());
                // AvailableDeviceService.registerAvailableDevice(newAvailableDevice);
            }
                


        roomService.deleteRoom(roomId);

        // return new MessageResponse("Room deleted successfully"); //perceber como mandar msg de resposta 
    }
    
    @GetMapping("/room-automatized/{roomId}")
    @ApiOperation(value = "Get Room Automatized", notes = "Get if a room is automatized by ID", response = Boolean.class)
    public Boolean getRoomAutomatized(@PathVariable ObjectId roomId) {
        return roomService.roomIsAutomatized(roomId);
    }


    @GetMapping("/room-stats/{roomId}")
    @ApiOperation(value = "Get Room Statistics", notes = "Get statistics of a room by ID", response = RoomStats.class)
    public RoomStats getRoomStatistics(@PathVariable ObjectId roomId) {
        return roomService.getRoomStatistics(roomId);
    }
}
