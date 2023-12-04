package com.SensorSafe.API.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
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
        roomService.deleteRoom(roomId);
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
