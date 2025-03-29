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

    // Requête pour récupérer les localisations proches (optimisé avec HQL)
    @Query("SELECT l FROM LocalisationEntity l WHERE " +
           "(6371 * acos(cos(radians(:latitude)) * cos(radians(l.latitude)) " +
           "* cos(radians(l.longitude) - radians(:longitude)) + sin(radians(:latitude)) " +
           "* sin(radians(l.latitude)))) < :distanceMax")
    List<LocalisationEntity> findLocalisationsProches(double latitude, double longitude, double distanceMax);
}
