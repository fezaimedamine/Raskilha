package com.example.RaskilhaBackend.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "comptes")
@Data
public class compteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String CIN;
    private String nom;
    private String prenom;
    private int age;
    private String genre;
    private String email;
    private String password;
    private String nomProfil;
    private String num;
    private String type;
    private long points;
}