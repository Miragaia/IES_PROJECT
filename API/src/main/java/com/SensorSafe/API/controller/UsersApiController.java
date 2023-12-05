package com.SensorSafe.API.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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


import com.SensorSafe.API.model.Response;

@RestController
@RequestMapping("/sensorsafe")
@Api(value = "Users API", description = "Operations pertaining to users", tags = "Users" )
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

    @GetMapping("/users/{username}")
    public User getUser(@PathVariable String username) {
        if (!userService.existsByUsername(username)) {
            throw new UserNotFoundException("User not found");
        }
        return userService.findByUsername(username);
    }

    @PostMapping("/login")
    @ApiOperation(value = "Login", notes = "Login to the application and generate JWT token", response = JwtResponse.class)
    public JwtResponse createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        // print do que é recebido em logs
        System.out.println(authenticationRequest.toString());

        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();

        if (username == null || password == null) {
            return new JwtResponse("Username or password not provided", null);
        }

       // o login pode ser por username ou email
        UserDetails userDetails = userService.findByUsername(username);
        if (userDetails == null) {
            userDetails = userService.findByEmail(username);
        }

        if (userDetails == null) {
            throw new UserNotFoundException("Invalid username or password");
        }
        
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new UserNotFoundException("Invalid username or password");
        }

        String token = jwtTokenUtil.generateToken(userDetails);

        System.out.println("Token: " + token + "userDetails: " + userDetails.toString());

        return new JwtResponse("Login successful", token);
    }    

    @PostMapping("/register")
    @ApiOperation(value = "Register", notes = "Register a new user", response = JwtResponse.class)
    public Response register(@RequestBody User user, HttpServletRequest request) {

        // dar print do que é recebido em logs
        

        if (!user.isValid()) {
            throw new UserNotFoundException("Invalid user");
        }
        
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userDetailsService.register(user);
        } catch (DuplicateKeyException e) {
            throw new UserNotFoundException("User already exists " + user.getEmail());
        }

        return new Response("Registration successful");
    }

    @GetMapping("/test")
    @ApiOperation(value = "Test", notes = "Test endpoint", response = String.class)
    public String test() {
        return "Test successful";
    }
}
