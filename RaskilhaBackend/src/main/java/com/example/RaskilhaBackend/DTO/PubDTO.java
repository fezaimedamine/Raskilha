package com.example.RaskilhaBackend.DTO;

import java.util.Date;

import com.example.RaskilhaBackend.Entity.Localisation;
import com.example.RaskilhaBackend.Entity.PubEntity;

import jakarta.persistence.Embedded;
import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class PubDTO {
    private Long id;
    private String titre;
    //private String image;
    @Lob
    private byte[] image;
    private String description;
    @Embedded
    private Localisation localisation; // Utilisation d'une classe embarquée pour la localisation
    private Date dateHeure;
    private String etat; // Exemple : "ACTIVE", "INACTIVE"
    private String type; // Exemple : "OFFRE", "DEMANDE"
    private Long user_id;
    private String userNomProfil;
    @Lob
    private byte[] imageProfil;

    public PubDTO(PubEntity pub){
        this.id = pub.getId();
        this.titre = pub.getTitre();
        this.image = pub.getImage();
        this.description = pub.getDescription();
        this.localisation = pub.getLocalisation();
        this.dateHeure = pub.getDateHeure();
        this.etat = pub.getEtat();
        this.type = pub.getType();
    
        if (pub.getUser() != null) {
            this.user_id = pub.getUser().getId();
            this.userNomProfil = pub.getUser().getNomProfil();
            this.imageProfil=pub.getUser().getImageProfil();
        } else {
            this.user_id = null;
            this.userNomProfil = "Utilisateur inconnu";
        }
    }
    
    
}
