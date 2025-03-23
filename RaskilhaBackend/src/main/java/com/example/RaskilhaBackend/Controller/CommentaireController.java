package com.example.RaskilhaBackend.Controller;

import com.example.RaskilhaBackend.Entity.Commentaire;
import com.example.RaskilhaBackend.Service.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commentaires")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    // Ajouter un commentaire
    @PostMapping("/ajouter")
    public Commentaire ajouterCommentaire(@RequestBody Commentaire commentaire) {
        return commentaireService.ajouterCommentaire(commentaire);
    }

    // Récupérer tous les commentaires
    @GetMapping("/all")
    public List<Commentaire> getAllCommentaires() {
        return commentaireService.getAllCommentaires();
    }

    // Modifier un commentaire
    @PutMapping("/modifier/{id}")
    public Commentaire modifierCommentaire(@PathVariable Long id, @RequestBody Commentaire commentaire) {
        return commentaireService.modifierCommentaire(id, commentaire);
    }

    // Supprimer un commentaire
    @DeleteMapping("/supprimer/{id}")
    public String supprimerCommentaire(@PathVariable Long id) {
        commentaireService.supprimerCommentaire(id);
        return "Commentaire supprimé avec succès.";
    }
}
