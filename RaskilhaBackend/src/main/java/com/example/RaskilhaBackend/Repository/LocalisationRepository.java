package com.example.RaskilhaBackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.RaskilhaBackend.Entity.LocalisationEntity;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LocalisationRepository extends JpaRepository<LocalisationEntity, Long> {

    // Récupérer les localisations des dernières 24 heures
    @Query("SELECT l FROM LocalisationEntity l WHERE l.dateEnregistrement >= :date")
    List<LocalisationEntity> findLast24Hours(LocalDateTime date);
}
