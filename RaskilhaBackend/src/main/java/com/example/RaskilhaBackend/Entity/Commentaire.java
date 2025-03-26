package com.example.RaskilhaBackend.Entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String texte;
    private Date dateCreation;

    @ManyToOne
    @JoinColumn(name = "pub_id")
    @JsonBackReference
    private PubEntity pub;

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

    public PubEntity getPub() {
        return pub;
    }

    public void setPub(PubEntity pub) {
        this.pub = pub;
    }
}