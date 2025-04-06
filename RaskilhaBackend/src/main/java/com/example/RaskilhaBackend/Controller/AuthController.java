package com.example.RaskilhaBackend.Controller;

import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RaskilhaBackend.DTO.LoginRequest;
import com.example.RaskilhaBackend.DTO.LoginResponse;
import com.example.RaskilhaBackend.DTO.UserDTO;
import com.example.RaskilhaBackend.Entity.UserEntity;
import com.example.RaskilhaBackend.Security.utils.JwtUtil;
import com.example.RaskilhaBackend.Service.CustomUserDetailsService;
import com.example.RaskilhaBackend.Service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                          CustomUserDetailsService userDetailsService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Tentative de connexion pour l'email : {}", loginRequest.getEmail());

        // Vérifier l'utilisateur et le mot de passe via UserService
        UserDTO user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        logger.info("UserDTO for login: {}", user);
        // Authentification via Spring Security
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), loginRequest.getPassword()));

        // Générer le token JWT
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails.getUsername());
        return ResponseEntity.ok(new LoginResponse(token, user));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserEntity user) {
        logger.info("Requête d'inscription reçue pour l'email : {}", user.getEmail());

        try {
            userService.createAccount(user);
            return ResponseEntity.ok("Utilisateur enregistré avec succès !");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Long id, @RequestBody UserEntity userDetails) {
        try {
            UserEntity updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/{id}")
    public Optional<UserEntity> getUser(@PathVariable long id){
        return userService.getUser(id);
    }
    
}
