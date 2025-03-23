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

    private final LocalisationRepository LocalisationRepository;

    // Ajouter une LocalisationEntity
    public LocalisationEntity ajouterLocalisation(LocalisationEntity LocalisationEntity) {
        return LocalisationRepository.save(LocalisationEntity);
    }

    // Retourner toutes les LocalisationEntitys
    public List<LocalisationEntity> getAllLocalisations() {
        return LocalisationRepository.findAll();
    }

    // Retourner les LocalisationEntitys des dernières 24 heures
    public List<LocalisationEntity> getLocalisationsLast24Hours() {
        LocalDateTime ilYAT24h = LocalDateTime.now().minusHours(24);
        return LocalisationRepository.findLast24Hours(ilYAT24h);
    }

    // Supprimer une LocalisationEntity par ID
    public void supprimerLocalisation(Long id) {
        LocalisationRepository.deleteById(id);
    }
}
