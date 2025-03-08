package com.example.RaskilhaBackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.RaskilhaBackend.Entity.UserEntity;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
}
