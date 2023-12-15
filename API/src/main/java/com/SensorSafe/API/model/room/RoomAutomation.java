package com.SensorSafe.API.model.room;

import lombok.AllArgsConstructor;
import lombok.Data; 
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonInclude;


@Data
@AllArgsConstructor
@NoArgsConstructor  
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomAutomation {
    private boolean automatizedTemperature;
    private int minTemperature;
    private int maxTemperature;

    private boolean automatizedHumidity;
    private int minHumidity;
    private int maxHumidity;

    private boolean automatizedSmoke;
    private int maxSmoke;
}
