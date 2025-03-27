package com.example.RaskilhaBackend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
//@Table(name = "TableLocalisation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocalisationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom de la localisation est requis")
    private String nom;

    @NotNull(message = "La latitude est requise")
    private Double latitude;

    @NotNull(message = "La longitude est requise")
    private Double longitude;

    private LocalDateTime dateEnregistrement = LocalDateTime.now();
}
