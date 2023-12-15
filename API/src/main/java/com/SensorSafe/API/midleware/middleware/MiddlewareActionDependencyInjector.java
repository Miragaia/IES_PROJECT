package com.SensorSafe.API.midleware.middleware;


import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.SensorSafe.API.auth.AuthHandler;
import com.SensorSafe.API.services.RoomService;
import com.SensorSafe.API.services.SensorEventService;
import com.SensorSafe.API.services.SensorService;

@Component
@Getter
public class MiddlewareActionDependencyInjector {
    
        private final RoomService roomService;
        private final SensorService sensorService;
        private final SensorEventService sensorEventService;
        private final AuthHandler authHandler;
    
        @Autowired
        public MiddlewareActionDependencyInjector(RoomService roomService, SensorService sensorService, SensorEventService sensorEventService, AuthHandler authHandler) {
            this.roomService = roomService;
            this.sensorService = sensorService;
            this.sensorEventService = sensorEventService;
            this.authHandler = authHandler;
        }

        
}
