package com.example.RaskilhaBackend.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.RaskilhaBackend.Entity.LocalisationEntity;
import com.example.RaskilhaBackend.Repository.LocalisationRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocalisationService {

    private final LocalisationRepository localisationRepository;

    // Ajouter une localisation
    public LocalisationEntity ajouterLocalisation(LocalisationEntity localisationEntity) {
        return localisationRepository.save(localisationEntity);
    }

    // Retourner toutes les localisations
    public List<LocalisationEntity> getAllLocalisations() {
        return localisationRepository.findAll();
    }

    // Retourner les localisations des dernières 24 heures
    public List<LocalisationEntity> getLocalisationsLast24Hours() {
        LocalDateTime ilYAT24h = LocalDateTime.now().minusHours(24);
        return localisationRepository.findLast24Hours(ilYAT24h);
    }

    // Supprimer une localisation par ID
    public void supprimerLocalisation(Long id) {
        localisationRepository.deleteById(id);
    }

    // Calculer la distance entre deux points en utilisant la formule de Haversine
    private double calculerDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Rayon de la Terre en km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance en km
    }

    // Retourner les localisations proches d'un utilisateur en fonction d'une distance max (en km)
    public List<LocalisationEntity> getLocalisationsProches(double latitude, double longitude, double distanceMax) {
        List<LocalisationEntity> allLocalisations = localisationRepository.findAll();
        return allLocalisations.stream()
                .filter(loc -> calculerDistance(latitude, longitude, loc.getLatitude(), loc.getLongitude()) <= distanceMax)
                .toList();
    }
}
