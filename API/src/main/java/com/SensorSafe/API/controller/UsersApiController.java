package com.SensorSafe.API.controller;

import javax.print.DocFlavor.STRING;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.SensorSafe.API.exceptions.UserNotFoundException;

import com.SensorSafe.API.tokens.JwtRequest;
import com.SensorSafe.API.tokens.JwtResponse;
import com.SensorSafe.API.tokens.JwtUserDetailsService;
import com.SensorSafe.API.tokens.JwtTokenUtil;

import com.SensorSafe.API.model.users.User;
import com.SensorSafe.API.repository.UserRepository;
import com.SensorSafe.API.services.UserService;


@RestController
@RequestMapping("/sensorsafe")
public class UsersApiController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;

    @Autowired
    public UsersApiController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, JwtUserDetailsService userDetailsService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public JwtResponse createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();

        if (username == null || password == null) {
            return new JwtResponse("Username or password not provided", null);
        }

        UserDetails userDetails = userService.findByUsername(username);

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new UserNotFoundException("Invalid username or password");
        }

        String token = jwtTokenUtil.generateToken(userDetails);

        return new JwtResponse("Login successful", token);
    }    

    @PostMapping("/register")
    public JwtResponse register(@RequestBody User user) {
        
        if (!user.isValid()) {
            return new JwtResponse("Invalid user", null);
        }
        
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userDetailsService.register(user);
        } catch (DuplicateKeyException e) {
            return new JwtResponse("User already exists", null);
        }

        return new JwtResponse("Registration successful", null);
    }
}
