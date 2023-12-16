package com.SensorSafe.API.midleware.middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.SensorSafe.API.utils.RequestType;

import java.lang.reflect.Constructor;

@Component
public class MiddlewareActionFactory {
    
    private MiddlewareActionDependencyInjector middlewareActionDependencyInjector;

    @Autowired
    public MiddlewareActionFactory(MiddlewareActionDependencyInjector middlewareActionDependencyInjector) {
        this.middlewareActionDependencyInjector = middlewareActionDependencyInjector;
    }


    public MiddlewareAction generate(String endpointUrl, RequestType requestType, Object... args) {

        for (MiddlewareRegister middlewareActionsRegister : MiddlewareRegister.values()) {

            if (middlewareActionsRegister.getEndpoint().equalsIgnoreCase(endpointUrl) && middlewareActionsRegister.getRequestType() == requestType) {

                Class<? extends MiddlewareAction> classExecutor = middlewareActionsRegister.getActionClass();
                Constructor<? extends MiddlewareAction> classConstructor = null;

                try {
                    classConstructor = classExecutor.getConstructor(MiddlewareActionDependencyInjector.class, Object[].class);
                    return classConstructor.newInstance(middlewareActionDependencyInjector, args);
                } catch (ReflectiveOperationException e) {
                    e.printStackTrace();
                }

            }

        }

        return null;

    }
}
