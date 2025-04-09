package com.example.RaskilhaBackend.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.RaskilhaBackend.DTO.PubDTO;
import com.example.RaskilhaBackend.Entity.PubEntity;
import com.example.RaskilhaBackend.Entity.UserEntity;
import com.example.RaskilhaBackend.Repository.PubRepository;
import com.example.RaskilhaBackend.Repository.UserRepository;

@Service
public class PubService {

    @Autowired
    private PubRepository pubRepository;

    @Autowired
    private UserRepository userRepository;

    public List<PubEntity> findPubByUserId(long user_id){
        return pubRepository.findByUserId(user_id);
    }

    public Page<PubDTO> getAllPubs(Pageable pageable) {
        Page<PubEntity> pubEntities = pubRepository.findAll(pageable);
        return pubEntities.map(PubDTO::new);
    }
    

    public Optional<PubEntity> getPubById(Long id) {
        return pubRepository.findById(id);
    }

    public PubEntity createPub(PubEntity pub) {
        pub.setDateHeure(new Date());
        Optional<UserEntity> optionalUser = userRepository.findById(pub.getUser().getId());
        if (optionalUser.isPresent()) {
            UserEntity existingUser = optionalUser.get();
            existingUser.setPoints(existingUser.getPoints()+1);
           // UserEntity user=userRepository.save(existingUser);
        } else {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID : " + pub.getUser().getId());
        }
        
        return pubRepository.save(pub);
    }

    public PubEntity updatePub(Long id, PubEntity pubDetails) {
        PubEntity pub = pubRepository.findById(id).orElseThrow(() -> new RuntimeException("Pub non trouvé"));
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

    // Récupérer les publications d'une région spécifique
    public List<PubEntity> getPubsByRegion(String ville) {
        return pubRepository.findByLocalisation_Ville(ville);
    }

    // Récupérer les publications de la région d’un utilisateur
    
    public Page<PubDTO> getPubsByRegion(String ville, Pageable pageable) {
        Page<PubEntity> pubsPage = pubRepository.findByLocalisation_VilleIgnoreCase(ville, pageable);
        return pubsPage.map(PubDTO::new);  // Transformer chaque PubEntity en PubDTO
    }
    

    public List<PubEntity> searchPubsByTitle(String titre) {
        return pubRepository.findByTitreContainingIgnoreCase(titre);
    }
    
}
