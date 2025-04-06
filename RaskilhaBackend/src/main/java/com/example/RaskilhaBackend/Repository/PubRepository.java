package com.example.RaskilhaBackend.Repository;

import com.example.RaskilhaBackend.Entity.PubEntity;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PubRepository extends JpaRepository<PubEntity, Long> {
    List<PubEntity> findByLocalisation_Ville(String ville);
    List<PubEntity> findByTitreContainingIgnoreCase(String titre);
    List<PubEntity> findByUserId(long user_id);

     // Récupérer les 5 dernières publications d'une ville donnée
    @Query("SELECT p FROM PubEntity p WHERE p.localisation.ville = :ville ORDER BY p.dateHeure DESC")
    List<PubEntity> findByLocalisation_VilleNotify(@Param("ville") String ville, Pageable pageable);
}
