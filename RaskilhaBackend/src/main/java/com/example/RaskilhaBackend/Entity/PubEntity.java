package com.example.RaskilhaBackend.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name = "publications")
@Data
public class PubEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    //private String image; // URL de l'image
    @Lob
    private byte[] image;
    private String description;
    @Embedded
    private Localisation localisation; // Utilisation d'une classe embarquée pour la localisation

    private Date dateHeure;
    private String etat; // Exemple : "ACTIVE", "INACTIVE"
    private String type; // Exemple : "OFFRE", "DEMANDE"
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private UserEntity user;

    @OneToMany(mappedBy = "pub", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Commentaire> commentaires;
}
