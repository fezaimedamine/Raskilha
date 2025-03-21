package com.example.RaskilhaBackend.Service;

import com.example.RaskilhaBackend.Entity.PubEntity;
import com.example.RaskilhaBackend.Repository.PubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PubService {

    @Autowired
    private PubRepository pubRepository;

    public List<PubEntity> getAllPubs() {
        return pubRepository.findAll();
    }

    public Optional<PubEntity> getPubById(Long id) {
        return pubRepository.findById(id);
    }

    public PubEntity createPub(PubEntity pub) {
        return pubRepository.save(pub);
    }

    public PubEntity updatePub(Long id, PubEntity pubDetails) {
        PubEntity pub = pubRepository.findById(id).orElseThrow(() -> new RuntimeException("Pub not found"));
        pub.setTitre(pubDetails.getTitre());
        pub.setImage(pubDetails.getImage());
        pub.setDescription(pubDetails.getDescription());
        pub.setLocalisation(pubDetails.getLocalisation());
        pub.setDateHeure(pubDetails.getDateHeure());
        pub.setEtat(pubDetails.getEtat());
        pub.setType(pubDetails.getType());
        return pubRepository.save(pub);
    }

    public void deletePub(Long id) {
        pubRepository.deleteById(id);
    }
}
