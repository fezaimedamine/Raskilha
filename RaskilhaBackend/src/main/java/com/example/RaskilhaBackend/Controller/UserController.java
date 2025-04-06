package com.example.RaskilhaBackend.Controller;

import com.example.RaskilhaBackend.Entity.UserEntity;
import com.example.RaskilhaBackend.Service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/raskilha")  // Base URL
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
public ResponseEntity<String> registerUser(@RequestBody UserEntity user) {
    logger.info("Received signup request for email: {}", user.getEmail());

    try {
        userService.createAccount(user);
        return ResponseEntity.ok("User registered successfully!");
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
}
@PostMapping("/update")
public ResponseEntity<String> changeUser(@RequestBody UserEntity user) {
    try {
        userService.updateUser(1,user);
        return ResponseEntity.ok("User updated successfully!");
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
}
    
}