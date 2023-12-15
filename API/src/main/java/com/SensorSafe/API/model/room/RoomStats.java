package com.SensorSafe.API.model.room;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomStats {

    private double temperature;
    private double humidity;
    private double smoke;

}
