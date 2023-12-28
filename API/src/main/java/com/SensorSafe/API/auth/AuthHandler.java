package com.SensorSafe.API.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public final class AuthHandler {

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public String getUsername() {
        return getAuthentication().getName();
    }

    public boolean isAdmin() {
        return getAuthentication().getName().equals("admin");
    }
}
