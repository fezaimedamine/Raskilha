package com.example.RaskilhaBackend.Controller;

import com.example.RaskilhaBackend.DTO.CommentaireDTO;
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
    /*exemple: http://localhost:8081/commentaires/ajouter
     * {
    "texte": "Superbe publication !",
    "pub": { "id": 3 },
    "user": {"id": 3 }
    }
     */
    @PostMapping("/ajouter")
    public Commentaire ajouterCommentaire(@RequestBody Commentaire commentaire) {
        return commentaireService.ajouterCommentaire(commentaire);
    }

    // Récupérer tous les commentaires
    // exemple: http://localhost:8081/commentaires/all
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
    @GetMapping("pub/{id}")
    public List<CommentaireDTO> getCommentairesParPubs(@PathVariable Long id){
        return commentaireService.getCommentairesParPublication(id);
    }
}
