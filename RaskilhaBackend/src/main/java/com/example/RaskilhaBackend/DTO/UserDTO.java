package com.example.RaskilhaBackend.DTO;

import com.example.RaskilhaBackend.Entity.UserEntity;
import lombok.Data;

@Data
public class UserDTO {
    private long user_id;
    private String nom;
    private String prenom;
    private int age;
    private String genre;
    private String region;
    private String adresse;
    private String email;
    private String nomProfil;
    private String tel;
    private String type;

    // Constructeur qui prend un UserEntity et initialise les champs du DTO
    public UserDTO(UserEntity user) {
        this.user_id=user.getId();
        this.nom = user.getNom();
        this.prenom = user.getPrenom();
        this.age = user.getAge();
        this.genre = user.getGenre();
        this.region = user.getRegion();
        this.adresse = user.getAdresse();
        this.email = user.getEmail();
        this.nomProfil = user.getNomProfil();
        this.tel = user.getTel();
        this.type = user.getType();
    }
}
