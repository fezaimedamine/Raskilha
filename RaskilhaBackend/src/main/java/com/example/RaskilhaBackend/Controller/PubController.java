package com.example.RaskilhaBackend.Controller;
import com.example.RaskilhaBackend.Entity.PubEntity;
import com.example.RaskilhaBackend.Service.PubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pubs")
public class PubController {

    @Autowired
    private PubService pubService;

    @GetMapping
    public List<PubEntity> getAllPubs() {
        return pubService.getAllPubs();
    }

    @GetMapping("/{id}")
    public PubEntity getPubById(@PathVariable Long id) {
        return pubService.getPubById(id).orElseThrow(() -> new RuntimeException("Pub non trouvé"));
    }

    @PostMapping
    public PubEntity createPub(@RequestBody PubEntity pub) {
        return pubService.createPub(pub);
    }

    @PutMapping("/{id}")
    public PubEntity updatePub(@PathVariable Long id, @RequestBody PubEntity pubDetails) {
        return pubService.updatePub(id, pubDetails);
    }

    @DeleteMapping("/{id}")
    public void deletePub(@PathVariable Long id) {
        pubService.deletePub(id);
    }

    // Endpoint pour récupérer les publications d’une région
    @GetMapping("/region/{ville}")
    public List<PubEntity> getPubsByRegion(@PathVariable String ville) {
        return pubService.getPubsByRegion(ville);
    }

    // Endpoint pour récupérer les publications de la région d'un utilisateur
    @GetMapping("/region/user/{userId}")
    public List<PubEntity> getPubsByUserRegion(@PathVariable Long userId) {
        return pubService.getPubsByUserRegion(userId);
    }
}
