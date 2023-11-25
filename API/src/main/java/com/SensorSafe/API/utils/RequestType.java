package com.SensorSafe.API.utils;

public enum RequestType {
    GET,
    POST,
    PUT,
    DELETE;

    public static RequestType fromString(String requestType) {
       for (RequestType type : RequestType.values()) {
           if (type.toString().equalsIgnoreCase(requestType)) {
               return type;
           }
       }
         return null;
    }
}
