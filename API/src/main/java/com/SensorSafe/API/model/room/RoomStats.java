package com.SensorSafe.API.model.room;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoomStats {

    private double temperature;
    private double humidity;
    private double pressure;
    private boolean smoke;

}
