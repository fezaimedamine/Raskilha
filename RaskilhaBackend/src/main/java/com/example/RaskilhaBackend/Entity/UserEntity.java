package com.example.RaskilhaBackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    
    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    private String password;
    private String nomProfil;
    private String tel;
    private String type;
    private long points = 0;

}
