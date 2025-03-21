package com.example.RaskilhaBackend.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;


@Entity
@Table(name = "publications")
@Data
public class PubEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String image; // URL de l'image
    private String description;

    @Embedded
    private Localisation localisation; // Utilisation d'une classe embarquée pour la localisation

    private Date dateHeure;
    private String etat; // Exemple : "ACTIVE", "INACTIVE"
    private String type; // Exemple : "OFFRE", "DEMANDE"

    @OneToMany(mappedBy = "pub", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commentaire> commentaires;
}
