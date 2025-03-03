package com.example.RaskilhaBackend.Service;

import com.example.RaskilhaBackend.Entity.compteEntity;
import com.example.RaskilhaBackend.Repository.compteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompteService {

    @Autowired
    private compteRepository compteRepository;

    public compteEntity createCompte(compteEntity compte) {
        // Insérer le compte dans la base de données
        return compteRepository.save(compte);
    }
}