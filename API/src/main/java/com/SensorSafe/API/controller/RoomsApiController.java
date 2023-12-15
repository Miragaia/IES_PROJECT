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

import com.SensorSafe.API.auth.AuthHandler;
import com.SensorSafe.API.exceptions.RoomNotFoundException;
import com.SensorSafe.API.exceptions.UserNotFoundException;

import com.SensorSafe.API.tokens.JwtRequest;
import com.SensorSafe.API.tokens.JwtResponse;
import com.SensorSafe.API.tokens.JwtUserDetailsService;
import com.SensorSafe.API.tokens.JwtTokenUtil;

import com.SensorSafe.API.model.room.Room;
import com.SensorSafe.API.model.room.RoomAutomation;
import com.SensorSafe.API.model.room.RoomStats;
import com.SensorSafe.API.repository.RoomRepository;
import com.SensorSafe.API.services.RoomService;
import com.SensorSafe.API.model.Response;
import com.SensorSafe.API.model.device.AvailableDevice;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.repository.DevicesRepository;
import com.SensorSafe.API.services.DeviceService;

import com.SensorSafe.API.services.AvailableDeviceService;




@RestController
@RequestMapping("/api")
@Api(value = "Rooms API", description = "Operations pertaining to rooms", tags = "Rooms" )
public class RoomsApiController {

    private final RoomService roomService;
    private final DeviceService deviceService;
    private final AvailableDeviceService availabledeviceService;
    private final AuthHandler authHandler;

    @Autowired
    public RoomsApiController(RoomService roomService, DeviceService deviceService, AvailableDeviceService availabledeviceService, AuthHandler authHandler) {
        this.roomService = roomService;
        this.deviceService = deviceService;
        this.availabledeviceService = availabledeviceService;
        this.authHandler = authHandler;
    }

    @PostMapping("/rooms")
    @ApiOperation(value = "Create Room", notes = "Create a new room", response = Room.class)
    public Response createRoom(@RequestBody Room room) {        
        if (!room.isValid())
            throw new RoomNotFoundException("Invalid room data - invalid room");

        if (room.getRoomId() == null)
            room.setRoomId(new ObjectId());

        if (room.getDevices() == null)
            room.setDevices(new ArrayList<>());

        if (room.getUsers() == null)  {      
            room.setUsers(new ArrayList<>());
            // adicionar o user que criou a sala
            room.getUsers().add(authHandler.getUsername());}

        if (room.getAutomatized() == null){
            room.setAutomatized(new RoomAutomation());
            room.getAutomatized().setAutomatizedTemperature(false);
            room.getAutomatized().setAutomatizedHumidity(false);
            room.getAutomatized().setAutomatizedSmoke(false);
        }
       
        try {
            roomService.RegisteRoom(room);
        } catch (DuplicateKeyException e) {
            throw new DuplicateKeyException("Room already exists - invalid room name");
        }

        return new Response("Room as been created successfully");
    }

    @GetMapping("/rooms")
    @ApiOperation(value = "Get All Rooms by user", notes = "Get a list of all rooms", response = Iterable.class)
    public Iterable<Room> getAllRooms() {
        return roomService.getRoomsByUser(authHandler.getUsername());
    }

    @DeleteMapping("/rooms/{roomId}")
    @ApiOperation(value = "Delete Room", notes = "Delete a room by ID")
    public Response deleteRoom(@PathVariable ObjectId roomId) {  
        if (!roomService.exists(roomId))
            throw new RoomNotFoundException("Room not found - invalid room ID");
        
        Room room = roomService.getRoom(roomId);

        if (room.getDevices() != null)
            for (Device device : room.getDevices()) {
                
                deviceService.deleteByDeviceId(device.getDeviceId());
                AvailableDevice newAvailableDevice = new AvailableDevice(device.getDeviceId(), "Device " + device.getDeviceId(), device.getCategory(), authHandler.getUsername());
                availabledeviceService.registerAvailableDevice(newAvailableDevice);

            }
                


        roomService.deleteRoom(roomId);

        return new Response("Room deleted successfully"); //perceber como mandar msg de resposta 
    }

    @GetMapping("/rooms/{roomId}")
    @ApiOperation(value = "Get Room by ID", notes = "Get a room by ID", response = Room.class)
    public Room getRoom(@PathVariable ObjectId roomId) {
        if (!roomService.exists(roomId))
            throw new RoomNotFoundException("Room not found - invalid room ID");
        
        return roomService.getRoom(roomId);
    }
    
    @PostMapping("/room-automatized/{roomId}")
    @ApiOperation(value = "Alter Room automation", notes = "Alter all automation of one room ", response = Boolean.class)
    public Response alterRoomAutomation(@PathVariable ObjectId roomId, @RequestBody RoomAutomation automation) {
        if (!roomService.exists(roomId))
            throw new RoomNotFoundException("Room not found - invalid room ID");
        
        Room room = roomService.getRoom(roomId);

        room.setAutomatized(automation);

        roomService.updateRoom(room);

        return new Response("Room automation altered successfully");
    }


    @GetMapping("/room-stats/{roomId}")
    @ApiOperation(value = "Get Room Statistics", notes = "Get statistics of a room by ID", response = RoomStats.class)
    public RoomStats getRoomStatistics(@PathVariable ObjectId roomId) {
        return roomService.getRoomStatistics(roomId);
    }
}
