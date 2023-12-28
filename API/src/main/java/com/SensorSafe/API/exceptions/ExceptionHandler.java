package com.SensorSafe.API.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(DeviceNotFoundException.class)
    public ResponseEntity<?> deviceNotFoundException(DeviceNotFoundException deviceNotFoundException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), deviceNotFoundException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(InvalidDeviceException.class)
    public ResponseEntity<?> invalidDeviceException(InvalidDeviceException invalidDeviceException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), invalidDeviceException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(RoomNotFoundException.class)
    public ResponseEntity<?> roomNotFoundException(RoomNotFoundException roomNotFoundException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), roomNotFoundException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(InvalidUserException.class)
    public ResponseEntity<?> invalidUserException(InvalidUserException invalidUserException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), invalidUserException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<?> userAlreadyExistsException(UserAlreadyExistsException userAlreadyExistsException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), userAlreadyExistsException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> userNotFoundException(UserNotFoundException userNotFoundException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), userNotFoundException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(InvalidRoomException.class)
    public ResponseEntity<?> invalidRoomException(InvalidRoomException invalidRoomException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), invalidRoomException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(InvalidPermissionsException.class)
    public ResponseEntity<?> invalidRoomException(InvalidPermissionsException invalidPermissionsException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), invalidPermissionsException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.FORBIDDEN);
    }

}
