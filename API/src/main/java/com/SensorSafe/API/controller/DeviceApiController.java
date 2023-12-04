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

import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.model.device.AbstractDevice;
import com.SensorSafe.API.model.device.AvailableDevice;
import com.SensorSafe.API.model.device.DeviceCategory;
import com.SensorSafe.API.model.device.Sensor;
import com.SensorSafe.API.repository.DevicesRepository;
import com.SensorSafe.API.services.DeviceService;


@RestController
@RequestMapping("/sensorsafe")
@Api(value = "Devices API", description = "Operations pertaining to devices", tags = "Devices")
public class DeviceApiController {

    private final DeviceService deviceService;

    @Autowired
    public DeviceApiController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping("/devices")
    @ApiOperation(value = "Register Device", notes = "Register a new device", response = Device.class)
    public Device registerDevice(@RequestBody Device device) {
        return deviceService.registerDevice(device);
    }

    @GetMapping("/devices")
    @ApiOperation(value = "Get All Devices", notes = "Get a list of all devices", response = Iterable.class)
    public Iterable<Device> getAllDevices() {
        return deviceService.getAllDevices();
    }

    @GetMapping("/devices/{deviceId}")
    @ApiOperation(value = "Get Device by ID", notes = "Get details of a device by ID", response = Device.class)
    public Device getDeviceById(@PathVariable ObjectId deviceId) {
        return deviceService.getDeviceById(deviceId);
    }

    @DeleteMapping("/devices/{deviceId}")
    @ApiOperation(value = "Delete Device by ID", notes = "Delete a device by ID", response = String.class)
    public String deleteDeviceById(@PathVariable ObjectId deviceId) {
        deviceService.deletDevicebyId(deviceId);
        return "Device deleted successfully";
    }

    @PutMapping("/devices")
    @ApiOperation(value = "Update Device", notes = "Update an existing device", response = Device.class)
    public String updateDevice(@RequestBody Device device) {
        deviceService.updateDevice(device);
        return "Device updated successfully";
    }
}

