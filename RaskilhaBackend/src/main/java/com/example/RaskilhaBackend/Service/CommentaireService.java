package com.example.RaskilhaBackend.Service;

import com.example.RaskilhaBackend.DTO.CommentaireDTO;
import com.example.RaskilhaBackend.Entity.Commentaire;

import com.example.RaskilhaBackend.Repository.CommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;

    // Ajouter un commentaire
    public Commentaire ajouterCommentaire(Commentaire commentaire) {
        commentaire.setDateCreation(new Date());
        return commentaireRepository.save(commentaire);
    }
    // Récupérer tous les commentaires
    public List<Commentaire> getAllCommentaires() {
        return commentaireRepository.findAll();
    }
    // Modifier un commentaire
    public Commentaire modifierCommentaire(Long id, Commentaire nouveauCommentaire) {
        Optional<Commentaire> commentaireOptional = commentaireRepository.findById(id);
        if (commentaireOptional.isPresent()) {
            Commentaire commentaireExistant = commentaireOptional.get();
            commentaireExistant.setTexte(nouveauCommentaire.getTexte());
            commentaireExistant.setDateCreation(nouveauCommentaire.getDateCreation());
            return commentaireRepository.save(commentaireExistant);
        } else {
            throw new RuntimeException("Commentaire non trouvé avec l'ID : " + id);
        }
    }

    // Supprimer un commentaire
    public void supprimerCommentaire(Long id) {
        if (commentaireRepository.existsById(id)) {
            commentaireRepository.deleteById(id);
        } else {
            throw new RuntimeException("Commentaire non trouvé avec l'ID : " + id);
        }
    }

    public List<CommentaireDTO> getCommentairesParPublication(Long pubId) {
        List<Commentaire> commentaires = commentaireRepository.findByPubId(pubId);
        
        return commentaires.stream().map(commentaire -> 
            new CommentaireDTO(
                commentaire.getId(),
                commentaire.getTexte(),
                commentaire.getDateCreation(),
                (commentaire.getUser() != null) ? commentaire.getUser().getId() : 0l,  // ✅ Vérification pour éviter le NullPointerException
                (commentaire.getUser() != null) ? commentaire.getUser().getNomProfil() : "Utilisateur inconnu",
                (commentaire.getUser() != null) ? commentaire.getUser().getImageProfil() : null
            )
        ).collect(Collectors.toList());
    }
}
