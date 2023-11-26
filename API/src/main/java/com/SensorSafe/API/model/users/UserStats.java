package com.SensorSafe.API.model.Users;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserStats {
    private int roomCounter;
    private int deviceCounter;
}
