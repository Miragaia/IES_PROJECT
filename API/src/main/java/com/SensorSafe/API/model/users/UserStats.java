package com.SensorSafe.API.model.users;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserStats {
    private int roomCounter;
    private int deviceCounter;
}
