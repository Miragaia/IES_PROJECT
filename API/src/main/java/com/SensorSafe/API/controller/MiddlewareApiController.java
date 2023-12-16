package com.SensorSafe.API.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.SensorSafe.API.exceptions.DeviceNotFoundException;
import com.SensorSafe.API.exceptions.InvalidPermissionsException;
import com.SensorSafe.API.exceptions.RoomNotFoundException;
import com.SensorSafe.API.exceptions.UserNotFoundException;
import com.SensorSafe.API.midleware.MiddlewareHandler;
import com.SensorSafe.API.midleware.MidlewareInterceptor;
import com.SensorSafe.API.tokens.JwtRequest;
import com.SensorSafe.API.tokens.JwtResponse;
import com.SensorSafe.API.tokens.JwtUserDetailsService;
import com.SensorSafe.API.utils.RequestType;
import com.SensorSafe.API.tokens.JwtTokenUtil;

import com.SensorSafe.API.auth.AuthHandler;
import com.SensorSafe.API.model.room.*;
import com.SensorSafe.API.model.Response;
import com.SensorSafe.API.model.device.*;
import com.SensorSafe.API.model.report.Report;
import com.SensorSafe.API.model.report.ReportSensorItem;
import com.SensorSafe.API.model.report.ReportType;
import com.SensorSafe.API.services.*;


import com.SensorSafe.API.model.room.Room;
import com.SensorSafe.API.model.room.RoomAutomation;
import com.SensorSafe.API.model.room.RoomStats;
import com.SensorSafe.API.repository.RoomRepository;


@RestController
@RequestMapping("/middleware")
public class MiddlewareApiController {

    private final MiddlewareHandler middlewareHandler;
    private final MidlewareInterceptor middlewareInterceptor;
    private final AuthHandler authHandler;

    private final RoomService roomService;
    private final DeviceService deviceService;
    private final ReportService reportService;
    private final SensorService sensorService;
    private final AvailableDeviceService availableSensorService;
    private final ReportSensorService reportSensorService;

    @Autowired
    public MiddlewareApiController(MiddlewareHandler middlewareHandler, MidlewareInterceptor middlewareInterceptor, AuthHandler authHandler, RoomService roomService, DeviceService deviceService, ReportService reportService, SensorService sensorService, AvailableDeviceService availableSensorService, ReportSensorService reportSensorService) {
        this.middlewareHandler = middlewareHandler;
        this.middlewareInterceptor = middlewareInterceptor;
        this.authHandler = authHandler;
        this.roomService = roomService;
        this.deviceService = deviceService;
        this.reportService = reportService;
        this.sensorService = sensorService;
        this.availableSensorService = availableSensorService;
        this.reportSensorService = reportSensorService;
    }

    @GetMapping("/sensors")
    @ApiOperation(value = "Get all sensors", notes = "Returns a list of all sensors")
    public List<Sensor> getAllSensors() {
        if (authHandler.isAdmin())
            return sensorService.getAllSensors();
        else
            throw new InvalidPermissionsException();
    }

    @GetMapping("/sensors/available")
    @ApiOperation(value = "Get all available sensors", notes = "Returns a list of all available sensors")
    public List<AvailableDevice> getAllAvailableSensors() {
        if (authHandler.isAdmin())
            return availableSensorService.getAllAvailableDevices();
        else
            throw new InvalidPermissionsException();
    }

    @PostMapping("/sensors/available")
    @ApiOperation(value = "Create available sensor", notes = "Creates a new available sensor")
    public Response createAvailableSensor(@RequestBody AvailableDevice availableDevice) {
        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();

        if (availableSensorService.availableDeviceExists(availableDevice.getDeviceId()))
            availableSensorService.deleteAvailableDeviceById(availableDevice.getDeviceId());

        availableSensorService.registerAvailableDevice(availableDevice);

        return new Response("Sensor created successfully");
    }

    @DeleteMapping("/sensors/available/{sensorId}")
    @ApiOperation(value = "Delete available sensor", notes = "Deletes a available sensor")
    public Response deleteAvailableSensor(@PathVariable ObjectId sensorId) {
        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();

        if (!availableSensorService.availableDeviceExists(sensorId))
            throw new DeviceNotFoundException("Invalid sensor data with id: " + sensorId + " - invalid sensor");

        availableSensorService.deleteAvailableDeviceById(sensorId);

        return new Response("Sensor deleted successfully");
    }
    
    @GetMapping("/devices/sensor/{sensorId}")
    @ApiOperation(value = "Get state sensor by id", notes = "Returns a sensor by id")
    public Sensor getStateSensor(@PathVariable ObjectId sensorId) {
        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();

        if (!sensorService.sensorExists(sensorId))
            throw new DeviceNotFoundException("Invalid sensor data with id: " + sensorId + " - invalid sensor");

        return sensorService.getSensorById(sensorId);
    }

    @GetMapping("/devices/avaliable/{sensorId}")
    @ApiOperation(value = "Get available sensor by id", notes = "Returns a sensor by id")
    public AvailableDevice getAvailableSensor(@PathVariable ObjectId sensorId) {
        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();

        if (!availableSensorService.availableDeviceExists(sensorId))
            throw new DeviceNotFoundException("Invalid sensor data with id: " + sensorId + " - invalid sensor");

        return availableSensorService.getAvailableDeviceById(sensorId);
    }

    @GetMapping("/rooms")
    @ApiOperation(value = "Get all rooms", notes = "Returns a list of all rooms")
    public List<Room> getAllRooms() {
        if (authHandler.isAdmin())
            return roomService.getAllRooms();
        else
            throw new InvalidPermissionsException();
    }

    @GetMapping("/rooms/{roomId}")
    @ApiOperation(value = "Get room by id", notes = "Returns a room by id")
    public Room getRoom(@PathVariable ObjectId roomId) {
        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();

        if (!roomService.exists(roomId))
            throw new RoomNotFoundException("Invalid room data with id: " + roomId + " - invalid room");

        return roomService.getRoom(roomId);
    }

    @PutMapping("/devices/sensor")
    @ApiOperation(value = "Update sensor", notes = "Updates a sensor")
    public Response updateSensor(@RequestBody Sensor sensor) {
        if (!authHandler.isAdmin())
            throw new InvalidPermissionsException();

        if (!sensorService.sensorExists(sensor.getDeviceId()))
            throw new DeviceNotFoundException("Invalid sensor data with id: " + sensor.getDeviceId() + " - invalid sensor");

        if (!sensorService.sensorExists(sensor.getDeviceId()))
            throw new DeviceNotFoundException("Invalid sensor data with id: " + sensor.getDeviceId() + " - invalid sensor");

        Sensor oldSensor = sensorService.getSensorById(sensor.getDeviceId());
        

        oldSensor.setSensorStatus(sensor.isSensorStatus());
        oldSensor.setValue(sensor.getValue());

        sensorService.updateSensor(oldSensor);

        ReportSensorItem reportSensorItem = new ReportSensorItem(null,authHandler.getUsername(), ReportType.DEVICES, new Date(), String.format("Sensor %s of type %s update the value to %f.",sensor.getDeviceId(),sensor.getCategory(), oldSensor.getValue()), sensor.getDeviceId(), sensor.getCategory().toString(), sensor.isSensorStatus() ? "ON" : "OFF", sensor.getValue());
        reportSensorService.registerReportSensor(reportSensorItem);

        middlewareInterceptor.intercept("/middleware/devices/sensor", RequestType.PUT, sensor);

        return new Response("Sensor updated successfully");
    }

    @GetMapping("/rooms/{roomId}/stats")
    @ApiOperation(value = "Get room stats by id", notes = "Returns a room stats by id")
    public RoomStats getRoomStats(@PathVariable ObjectId roomId) {

        if (!roomService.exists(roomId))
            throw new RoomNotFoundException("Invalid room data with id: " + roomId + " - invalid room");

        return middlewareHandler.calculateRoomStats(roomId);
    }

    // @GetMapping("/rooms/{roomId}/automation")
    // @ApiOperation(value = "Get room automation by id", notes = "Returns a room automation by id")
    // public RoomAutomation getRoomAutomation(@PathVariable ObjectId roomId) {

    //     if (!roomService.roomExists(roomId))
    //         throw new RoomNotFoundException("Invalid room data with id: " + roomId + " - invalid room");

    //     return middlewareHandler.calculateRoomAutomation(roomId);
    // }
}
