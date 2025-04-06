package com.example.RaskilhaBackend.Service;

import com.example.RaskilhaBackend.DTO.UserDTO;
import com.example.RaskilhaBackend.Entity.UserEntity;
import com.example.RaskilhaBackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Création d'un compte avec hachage du mot de passe
    public UserEntity createAccount(UserEntity user) {
    if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
        throw new RuntimeException("Le mot de passe ne peut pas être vide !");
    }

    Optional<UserEntity> existingUser = userRepository.findByEmail(user.getEmail());
    if (existingUser.isPresent()) {
        throw new RuntimeException("Email déjà utilisé !");
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
}


    // Authentification avec vérification du mot de passe
    public UserDTO authenticateUser(String email, String rawPassword) {
    UserEntity user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé !"));
    
    System.out.println(user.getPassword());
    System.out.println(passwordEncoder.encode(rawPassword));
    if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
        throw new BadCredentialsException("Mot de passe incorrect !");
    }
    UserDTO user1=new UserDTO(user);
    return user1;
    }

    
    

    // Mise à jour des informations utilisateur
    public UserEntity updateUser( UserEntity updatedUser) {
        Long id;
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            UserEntity existingUser = optionalUser.get();
            
            existingUser.setNom(updatedUser.getNom());
            existingUser.setPrenom(updatedUser.getPrenom());
            existingUser.setAge(updatedUser.getAge());
            existingUser.setGenre(updatedUser.getGenre());
            existingUser.setRegion(updatedUser.getRegion());
            existingUser.setAdresse(updatedUser.getAdresse());
            existingUser.setTel(updatedUser.getTel());
            existingUser.setNomProfil(updatedUser.getNomProfil());
            existingUser.setType(updatedUser.getType());
            existingUser.setPoints(updatedUser.getPoints());

            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID : " + id);
        }
    }
}
