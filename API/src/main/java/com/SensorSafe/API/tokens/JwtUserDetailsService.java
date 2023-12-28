package com.SensorSafe.API.tokens;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.SensorSafe.API.model.users.User;
import com.SensorSafe.API.repository.UserRepository;
import com.SensorSafe.API.exceptions.UserNotFoundException;

@Service
public class JwtUserDetailsService  implements UserDetailsService{

    private final UserRepository userRepository;

    @Autowired
    public JwtUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String username){
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    public void register (User user){
       try{
            UserDetails userDetails = loadUserByUsername(user.getUsername());
            if (userDetails != null) {
                throw new UserNotFoundException("User already exists");
            }
       } catch (Exception e){
            if (!user.isValid())
                throw new UserNotFoundException("Invalid user");
            userRepository.save(user);
       }
    }
    
}
