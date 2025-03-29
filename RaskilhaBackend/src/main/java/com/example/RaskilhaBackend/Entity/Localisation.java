package com.example.RaskilhaBackend.Entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class Localisation {

    private String adresse;
    private String ville;

    // Getters et Setters
    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }
}