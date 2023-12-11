package com.SensorSafe.API.exceptions;

public class InvalidPermissionsException extends RuntimeException {

    public InvalidPermissionsException(String message) {
        super(message);
    }

    public InvalidPermissionsException() {
        super("Permission denied to perform this action.");
    }
}
