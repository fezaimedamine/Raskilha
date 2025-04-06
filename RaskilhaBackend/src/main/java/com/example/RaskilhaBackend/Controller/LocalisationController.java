package com.example.RaskilhaBackend.Controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.RaskilhaBackend.Entity.LocalisationEntity;
import com.example.RaskilhaBackend.Service.LocalisationService;

import java.util.List;

@RestController
@RequestMapping("/api/localisations")
@RequiredArgsConstructor
public class LocalisationController {

    private final LocalisationService localisationService;

    // Ajouter une localisation
    /*exemple: http://localhost:8081/api/localisations
     * {
    "nom": "Tunis",
    "latitude": 50.858844,
    "longitude": 3.294351
        }
     */
    
    @PostMapping
    public ResponseEntity<LocalisationEntity> ajouterLocalisation(@RequestBody LocalisationEntity localisation) {
        LocalisationEntity saved = localisationService.ajouterLocalisation(localisation);
        return ResponseEntity.ok(saved);
    }

    // Récupérer toutes les localisations
    @GetMapping
    public ResponseEntity<List<LocalisationEntity>> getAllLocalisations() {
        return ResponseEntity.ok(localisationService.getAllLocalisations());
    }

    // Récupérer les localisations des dernières 24 heures
    @GetMapping("/last24hours")
    public ResponseEntity<List<LocalisationEntity>> getLocalisationsLast24Hours() {
        return ResponseEntity.ok(localisationService.getLocalisationsLast24Hours());
    }
    // retourner les localisations proches
    
    @GetMapping("/proches")
    public List<LocalisationEntity> getLocalisationsProches(@RequestParam double latitude,
                                                            @RequestParam double longitude,
                                                            @RequestParam double distanceMax) {
        return localisationService.getLocalisationsProches(latitude, longitude, distanceMax);
    }

    // Supprimer une localisation par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> supprimerLocalisation(@PathVariable Long id) {
        localisationService.supprimerLocalisation(id);
        return ResponseEntity.ok("Localisation supprimée avec succès !");
    }
}

