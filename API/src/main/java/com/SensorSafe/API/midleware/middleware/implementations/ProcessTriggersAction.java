package com.SensorSafe.API.midleware.middleware.implementations;

import com.SensorSafe.API.auth.AuthHandler;
import com.SensorSafe.API.services.RoomService;
import com.SensorSafe.API.services.SensorEventService;
import com.SensorSafe.API.services.SensorService;

import com.SensorSafe.API.model.device.Sensor;

import com.SensorSafe.API.model.sensor_events.SensorEvents;
import com.SensorSafe.API.model.sensor_events.ActionType;
import com.SensorSafe.API.model.sensor_events.Trigger;

import com.SensorSafe.API.midleware.middleware.MiddlewareAction;
import com.SensorSafe.API.midleware.middleware.MiddlewareActionDependencyInjector;

public class ProcessTriggersAction extends MiddlewareAction {

    public ProcessTriggersAction(MiddlewareActionDependencyInjector middlewareActionDependencyInjector, Object[] args) {
        super(middlewareActionDependencyInjector, args);
    }

    @Override
    public boolean process() {
       
        if (getArgs().length <= 0) {
            return false;
        }

        Sensor sensor = (Sensor) getArgs()[0];
        SensorEventService sensorEventService =  getMiddlewareActionDependencyInjector().getSensorEventService();
        SensorService sensorService = getMiddlewareActionDependencyInjector().getSensorService();


        for (SensorEvents sensorEvents : sensorEventService.getAllSensorEvents() ){
            if (sensorEvents.getSensorId().equals(sensor.getDeviceId())){
                
                Trigger trigger = sensorEvents.getTrigger();
                Sensor targetSensor = sensorService.getSensorById(sensorEvents.getTargetId());
                
                switch (trigger.getType()) {
                    case ON_VALUE_EQUALS:
                        if ((double) sensor.getValue() == trigger.getValue()){
                            handleEvent(sensorEvents, targetSensor);
                        }                        
                        break;
                    
                    case ON_VALUE_BIGGER_THAN:
                        if ((double) sensor.getValue() > trigger.getValue()){
                            handleEvent(sensorEvents, targetSensor);
                        }                        
                        break;

                    case ON_VALUE_LESS_THAN:
                        if ((double) sensor.getValue() < trigger.getValue()){
                            handleEvent(sensorEvents, targetSensor);
                        }                        
                        break;

                    case ON_VALUE_SIMILIAR_TO:
                        if ((double) sensor.getValue() - trigger.getValue() <= 1){
                            handleEvent(sensorEvents, targetSensor);
                        }                        
                        break;

                    case ON_VALUE_DIFFERENT_THAN:
                        if ((double) sensor.getValue() != trigger.getValue()){
                            handleEvent(sensorEvents, targetSensor);
                        }                        
                        break;

                    default:
                        break;
                }
            }
        }
        return true;
    }

    private void handleEvent(SensorEvents sensorEvents, Sensor sensor) {
       
        if ( sensorEvents.getActionType() == ActionType.TURN_ON){
            sensor.setSensorStatus(true);
        } else if (sensorEvents.getActionType() == ActionType.TURN_OFF){
            sensor.setSensorStatus(false);
        }
    
        getMiddlewareActionDependencyInjector().getSensorService().updateSensor(sensor);
    }
    
}
