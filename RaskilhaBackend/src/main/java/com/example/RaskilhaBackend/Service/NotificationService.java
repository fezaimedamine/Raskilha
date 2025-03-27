package com.example.RaskilhaBackend.Service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;

import com.example.RaskilhaBackend.Entity.PubEntity;
import com.example.RaskilhaBackend.Entity.UserEntity;
import com.example.RaskilhaBackend.Repository.PubRepository;
import com.example.RaskilhaBackend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final PubRepository pubRepository;
    private final UserRepository userRepository;
    public List<PubEntity> getNotifications(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        Pageable pageable = PageRequest.of(0, 5);
        return pubRepository.findByLocalisation_VilleNotify(user.getRegion(),pageable);
    }

    
}
