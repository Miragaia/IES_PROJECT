package com.SensorSafe.API.midleware.middleware;

import lombok.Getter;
import com.SensorSafe.API.utils.RequestType;
import com.SensorSafe.API.midleware.middleware.implementations.ProcessTriggersAction;

@Getter
public enum MiddlewareRegister {

    PROCESS_TRIGGERS("/middleware/devices/sensor", RequestType.PUT, ProcessTriggersAction.class);

    private String endpoint;
    private RequestType requestType;
    private Class<? extends MiddlewareAction> actionClass;

    MiddlewareRegister(String endpoint, RequestType requestType, Class<? extends MiddlewareAction> actionClass) {
        this.endpoint = endpoint;
        this.requestType = requestType;
        this.actionClass = actionClass;
    }
}
