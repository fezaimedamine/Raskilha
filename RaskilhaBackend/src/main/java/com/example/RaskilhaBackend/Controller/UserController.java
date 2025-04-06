package com.example.RaskilhaBackend.Controller;  // Ensure the package matches your folder structure

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RaskilhaBackend.Entity.UserEntity;
import com.example.RaskilhaBackend.Repository.UserRepository;
import com.example.RaskilhaBackend.Service.LocalisationService;  // Import UserRepository

@RestController
@RequestMapping("/api/users")  // Base URL for user-related endpoints
public class UserController {

    @Autowired
    private UserRepository userRepository;  // Injecting the UserRepository

    @Autowired
    private LocalisationService localisationService;  // If you need to get localisation info

    // Endpoint to get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        Optional<UserEntity> user = userRepository.findById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();  // User not found
        }
    }

    // Endpoint to update user points (this could be called after a localisation is added)
   @PutMapping("/{id}/points")
public ResponseEntity<UserEntity> updateUserPoints(@PathVariable Long id, @RequestBody Map<String, Long> pointsToAdd) {
    Optional<UserEntity> userOptional = userRepository.findById(id);

    if (userOptional.isPresent()) {
        UserEntity user = userOptional.get();
        Long points = pointsToAdd.get("pointsToAdd");  // Extract pointsToAdd from the request body
        user.setPoints(user.getPoints() + points);  // Update points
        UserEntity updatedUser = userRepository.save(user);  // Save updated user

        return ResponseEntity.ok(updatedUser);
    } else {
        return ResponseEntity.notFound().build();  // User not found
    }
}

}
