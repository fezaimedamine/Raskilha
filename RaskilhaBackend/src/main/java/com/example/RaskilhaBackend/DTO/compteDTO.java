package com.example.RaskilhaBackend.DTO;

import lombok.Data;

@Data
public class compteDTO {
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
