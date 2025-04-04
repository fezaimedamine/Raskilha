package com.example.RaskilhaBackend.DTO;

import java.util.Date;

public class CommentaireDTO {
    private Long id;
    private String texte;
    private Date dateCreation;
    private long userId;
    private String profilName;
    private byte[] imageProfil;

    public CommentaireDTO(Long id, String texte, Date dateCreation, long userId, String profilName, byte[] imageProfil) {
        this.id = id;
        this.texte = texte;
        this.dateCreation = dateCreation;
        this.userId = userId;
        this.profilName = profilName;
        this.imageProfil = imageProfil;
    }

    public byte[] getImageProfil(){
        return imageProfil;
    }
    public void setImageProfil(byte[] imageProfil){
        this.imageProfil=imageProfil;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexte() {
        return texte;
    }

    public void setTexte(String texte) {
        this.texte = texte;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getprofilName() {
        return profilName;
    }

    public void setprofilName(String profilName) {
        this.profilName = profilName;
    }
}
