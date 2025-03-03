package com.example.RaskilhaBackend.Controller;

import com.example.RaskilhaBackend.Entity.compteEntity;
import com.example.RaskilhaBackend.Service.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompteController {
    @Autowired
    private CompteService compteService;
    @PostMapping("/raskilha/create")
    public compteEntity createCompte(@RequestBody compteEntity compte) {
        return compteService.createCompte(compte);
    }
}