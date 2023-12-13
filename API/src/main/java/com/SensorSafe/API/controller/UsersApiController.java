package com.SensorSafe.API.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import javax.servlet.http.HttpServletRequest;

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

    @GetMapping("/username/{username}")
    @ApiOperation(value = "Get user", notes = "Get user by username", response = User.class)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "User found", response = User.class),
        @ApiResponse(code = 404, message = "User not found"),
        @ApiResponse(code = 500, message = "Internal server error")
    })
    public User getUserByName(@PathVariable String username) {
        if (!userService.existsByUsername(username)) {
            throw new UserNotFoundException("User not found");
        }
        return userService.findByUsername(username);
    }

    @GetMapping("/useremail/{email}")
    @ApiOperation(value = "Get user", notes = "Get user by email", response = User.class)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "User found", response = User.class),
        @ApiResponse(code = 404, message = "User not found"),
        @ApiResponse(code = 500, message = "Internal server error")
    })
    public User getUserByEmail(@PathVariable String email) {
        if (!userService.existsByEmail(email)) {
            throw new UserNotFoundException("User not found");
        }
        return userService.findByEmail(email);
    }

    @PostMapping("/login")
    @ApiOperation(value = "Login", notes = "Login to the application and generate JWT token", response = JwtResponse.class)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Login successful", response = JwtResponse.class),
        @ApiResponse(code = 400, message = "Invalid username or password"),
        @ApiResponse(code = 500, message = "Internal server error")
    })
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
    @ApiOperation(value = "Register", notes = "Register a new user", response = Response.class)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Registration successful", response = Response.class),
        @ApiResponse(code = 400, message = "Invalid user"),
        @ApiResponse(code = 409, message = "User already exists"),
        @ApiResponse(code = 500, message = "Internal server error")
    })
    public Response register(@RequestBody User user, HttpServletRequest request) {

        if (!user.isValid()) {
            throw new UserNotFoundException("Invalid Credentials (insert all!)");
        }
        
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userDetailsService.register(user);
        } catch (DuplicateKeyException e) {
            throw new UserNotFoundException("User already exists " + user.getEmail());
        }

        return new Response("Registration successful");
    }
}
