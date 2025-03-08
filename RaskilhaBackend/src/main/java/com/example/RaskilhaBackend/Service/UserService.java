package com.example.RaskilhaBackend.Service;

import com.example.RaskilhaBackend.Entity.UserEntity;
import com.example.RaskilhaBackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserEntity createAccount(UserEntity user) {
        // Vérifier si l'email est déjà utilisé
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered");
        }
        
        // Hacher le mot de passe
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Sauvegarder l'utilisateur dans la base de données
        return userRepository.save(user);
    }
}