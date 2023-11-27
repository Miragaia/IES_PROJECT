package com.SensorSafe.API.services;

import org.springframework.stereotype.Service;
import com.SensorSafe.API.model.users.User;
import com.SensorSafe.API.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }
}
