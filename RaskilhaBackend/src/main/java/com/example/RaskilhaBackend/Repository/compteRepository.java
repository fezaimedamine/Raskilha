package com.example.RaskilhaBackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.RaskilhaBackend.Entity.compteEntity;

@Repository
public interface compteRepository extends JpaRepository<compteEntity, Long> {
    // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire
}
