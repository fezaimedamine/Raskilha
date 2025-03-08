package com.example.RaskilhaBackend.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.RaskilhaBackend.Service.CustomUserDetailsService;
import com.example.RaskilhaBackend.Service.UserService;
import com.example.RaskilhaBackend.Repository.UserRepository;
import com.example.RaskilhaBackend.Security.utils.JwtUtil;
import com.example.RaskilhaBackend.DTO.LoginRequest;
import com.example.RaskilhaBackend.DTO.LoginResponse;
import com.example.RaskilhaBackend.Entity.UserEntity;
import com.example.RaskilhaBackend.Exception.AuthenticationException;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, 
                          CustomUserDetailsService userDetailsService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
    System.out.println("Received request: " + loginRequest.getEmail() + ", " + loginRequest.getPassword());
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    String hashedPassword = encoder.encode("azerty");
    System.out.println("password hachééééééé:" + hashedPassword);
    String email = loginRequest.getEmail();
    String password = loginRequest.getPassword();
    Optional<UserEntity> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
        throw new AuthenticationException("Invalid email");
    }
    
    UserEntity user = userOpt.get();

    System.out.println("Provided password: " + password);
    System.out.println("Stored password: " + user.getPassword());

    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new AuthenticationException("Invalid password");
    }

    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

    String token=jwtUtil.generateToken(userDetails.getUsername());
    LoginResponse response = new LoginResponse(token, user);

    // Retourner la réponse avec le statut HTTP 200 (OK)
    return ResponseEntity.ok(response);
}
    @Autowired
    private UserService userService;
    // the endpoint for signup
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
}
