package com.SensorSafe.API.midleware;

import org.springframework.stereotype.Component;
import  org.springframework.beans.factory.annotation.Autowired;

import com.SensorSafe.API.midleware.middleware.MiddlewareActionFactory;
import com.SensorSafe.API.utils.RequestType;

@Component
public class MidlewareInterceptor {

    private MiddlewareActionFactory middlewareActionFactory;

    @Autowired
    public MidlewareInterceptor(MiddlewareActionFactory middlewareActionFactory) {
        this.middlewareActionFactory = middlewareActionFactory;
    }

    public void intercept(String url, RequestType requestType, Object args) {
        middlewareActionFactory.generate(url, requestType, args).process();
    }
    
}
