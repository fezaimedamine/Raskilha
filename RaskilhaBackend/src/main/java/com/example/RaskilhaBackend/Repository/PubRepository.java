package com.example.RaskilhaBackend.Repository;

import com.example.RaskilhaBackend.Entity.PubEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PubRepository extends JpaRepository<PubEntity, Long> {
    List<PubEntity> findByLocalisation_Ville(String ville);
}
