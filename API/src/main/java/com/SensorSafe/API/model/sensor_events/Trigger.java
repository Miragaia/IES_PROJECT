package com.SensorSafe.API.model.sensor_events;

import lombok.Data;

@Data
public class Trigger {

    private TriggerType type;
    private Double value;

}