package com.SensorSafe.API.tokens;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    
    
    private String message;
    private String token;
}
