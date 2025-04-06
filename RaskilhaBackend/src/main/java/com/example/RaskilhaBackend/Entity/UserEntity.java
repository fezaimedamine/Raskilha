package com.example.RaskilhaBackend.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "users")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nom;
    private String prenom;
    private int age;
    private String genre;
    private String region;
    private String adresse;
    @Lob
    private byte[] imageProfil;
    
    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String nomProfil;
    private String tel;
    private String type;
    private long points = 0;
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PubEntity> publications;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-reference")
    private Commentaire commentaire;

}



