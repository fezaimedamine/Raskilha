
package com.example.RaskilhaBackend.Controller;
import com.example.RaskilhaBackend.DTO.PubDTO;
import com.example.RaskilhaBackend.Entity.PubEntity;
import com.example.RaskilhaBackend.Service.PubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Sort;


import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pubs")
public class PubController {

    @Autowired
    private PubService pubService;

    @GetMapping("/user/{id}")
    public List<PubEntity> getPubByUserId(@PathVariable long id){
        return pubService.findPubByUserId(id);
    }
    @GetMapping("")
    public Page<PubDTO> getAllPubs(
        @PageableDefault(size = 10, sort = "dateHeure", direction = Sort.Direction.DESC) Pageable pageable) {
    
   
        return pubService.getAllPubs(pageable);
    
}


    @GetMapping("/{id}")
    public PubEntity getPubById(@PathVariable Long id) {
        return pubService.getPubById(id).orElseThrow(() -> new RuntimeException("Pub non trouvé"));
    }
    /*exemple : http://localhost:8081/api/pubs
     *  {
        "titre": "Nouvelle publication de test",
        "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        "description": "Ceci est une description de test pour la publication",
        "localisation": {
            "adresse": "123 Rue de Test",
            "ville": "Paris",
        },
        "etat": "ACTIVE",
        "type": "OFFRE",
        "user": {
            "id": 1
                }
        }
     */
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
    //exemple : http://localhost:8081/api/pubs/region/Paris
    @GetMapping("/region/{ville}")
    public List<PubDTO> getPubsByRegion(@PathVariable String ville) {
        return pubService.getPubsByRegion(ville);
    }

    // Endpoint pour récupérer les publications de la région d'un utilisateur
    // exemple : http://localhost:8081/api/pubs/region/user/3
    /*@GetMapping("/region/user/{userId}")
    public List<PubEntity> getPubsByUserRegion(@PathVariable Long userId) {

        return pubService.getPubsByUserRegion(userId);
    }*/
    // exemple : http://localhost:8081/api/pubs/search-by-title?titre=pub
    @GetMapping("/search-by-title")
    public List<PubEntity> searchPubs(@RequestParam String titre) {
        return pubService.searchPubsByTitle(titre);
}

}
